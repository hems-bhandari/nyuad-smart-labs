# Import the required libraries
import os
import pandas as pd
import matplotlib.pyplot as plt
from bertopic import BERTopic
from sklearn.feature_extraction.text import CountVectorizer
from gensim.models.coherencemodel import CoherenceModel
from gensim.corpora.dictionary import Dictionary
from umap import UMAP
from hdbscan import HDBSCAN
from bertopic.representation import KeyBERTInspired
from bertopic.representation import MaximalMarginalRelevance, OpenAI
from openai import OpenAI
import tiktoken
import itertools
import numpy as np
import re
import nltk
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer
import spacy
import csv
import configparser
import plotly.io as pio

nltk.download('punkt')

# Read the Excel file
df = pd.read_csv('Responses.csv')

# Load the SentenceTransformers model (SBERT)
model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to segment text based on a given semantic similarity threshold
def segment_text_nltk(text, similarity_threshold):
    # Remove newline characters and replace them with a space
    cleaned_text = text.replace('\n', ' ')
    
    # Use NLTK to tokenize sentences
    sentences = sent_tokenize(cleaned_text)
    
    # Clean each sentence from specified characters at the beginning
    sentences = [re.sub(r'^[\d\-*):.]+', '', sent.strip()) for sent in sentences]
    
    # Generate embeddings using the SentenceTransformers model
    embeddings = model.encode(sentences)
    segment_boundaries = [0]
    
    # Calculate cosine similarity of consecutive sentences to identify segment boundaries
    for i in range(len(embeddings) - 1):
        similarity = np.dot(embeddings[i], embeddings[i + 1]) / (np.linalg.norm(embeddings[i]) * np.linalg.norm(embeddings[i + 1]))
        if similarity < similarity_threshold:
            segment_boundaries.append(i + 1)
    segment_boundaries.append(len(sentences))
    
    segments = []
    for i in range(len(segment_boundaries) - 1):
        start, end = segment_boundaries[i], segment_boundaries[i + 1]
        segment_text_nltk = ' '.join(sentences[start:end])
        if len(segment_text_nltk.split()) > 3:  # Ensure the segment has more than three words (to avoid too short segments)
            segments.append(segment_text_nltk)
    return segments

# Create a new directory to store the CSV files
output_dir = '.'
os.makedirs(output_dir, exist_ok=True)

all_segments = []  # Initialize inside the loop to reset for each threshold

for _, row in df.iterrows():
    segments = segment_text_nltk(row['concat'], 0.5)
    for segment in segments:
        all_segments.append({
            'Team No': row['team_no'],
            'Year': row['year'],
            'Segmented Text': segment
        })
    
# Convert the list of dictionaries to a DataFrame
segment_df = pd.DataFrame(all_segments)

# Save all segments to a CSV file, including the threshold in the filename
filename = os.path.join(output_dir, f'semantic_segmentation_sbert_nltk_0.50.csv')
segment_df.to_csv(filename, index=False)

print(f"All segments have been written for threshold 0.5 in {filename}")

# UMAP parameters
n_neighbors = 15
n_components = 5

# HDBSCAN parameters
min_cluster_size = 10
min_samples = 10

directory = '.'
filename = 'semantic_segmentation_sbert_nltk_0.50.csv'
path = os.path.join(directory, filename)

# Load the dataset
df = pd.read_csv(path)
documents = df['Segmented Text'].tolist()

vectorizer_model = CountVectorizer(stop_words='english', ngram_range=(1,2))
umap_model = UMAP(n_neighbors=n_neighbors, n_components=n_components, 
                  min_dist=0.0, metric='cosine', random_state=42)
hdbscan_model = HDBSCAN(min_cluster_size=min_cluster_size, 
                        min_samples=min_samples, metric='euclidean', prediction_data=True)

model = BERTopic(vectorizer_model=vectorizer_model, 
                 umap_model=umap_model, 
                 hdbscan_model=hdbscan_model, 
                 nr_topics="auto")

topics, _ = model.fit_transform(documents)

# Get the representative documents for each topic
representative_docs = model.get_representative_docs()

# Extract topics and their respective keywords
topic_keywords = model.get_topics()

# Prepare DataFrame for storing all data
topic_data = []

# Process each topic
for topic_num, keywords in topic_keywords.items():
    if topic_num == -1:
        continue  # skip the outlier topic

    # Format keywords and their weights
    keywords_formatted = ", ".join([f"{word} ({weight:.2f})" for word, weight in keywords])

    # Retrieve representative documents for this topic
    if topic_num in representative_docs:
        rep_docs = representative_docs[topic_num][:3]  # Get top 3 docs, if available
    else:
        rep_docs = [None, None, None]  # Default empty list if no docs available

    # Ensure there are always three documents (or None if fewer are available)
    rep_docs += [None] * (3 - len(rep_docs))

    # Store data
    topic_data.append({
        "Topic": topic_num,
        "Topic Information": keywords_formatted,
        "Representative Document 1": rep_docs[0],
        "Representative Document 2": rep_docs[1],
        "Representative Document 3": rep_docs[2]
    })

# Create a DataFrame
topics_df = pd.DataFrame(topic_data)

# Save to CSV
topics_df.to_csv('bertopic_results.csv', index=False, quoting=csv.QUOTE_NONNUMERIC)

print("BERTopic analysis results have been saved to 'bertopic_results.csv'.")

# Retrieve all topics and their keywords
all_topics = model.get_topics()

# Print each topic and its keywords
for topic_num, topic in all_topics.items():
    print(f"Topic #{topic_num}:")
    keywords = ', '.join([word for word, score in topic])
    print(keywords)

num_topics = len(set(topics)) - (1 if -1 in topics else 0)
fig = model.visualize_barchart(top_n_topics=num_topics, width=360)

# Save the figure as a PNG file with specified resolution
fig.write_image("plot_high_res.png", width=1800, height=1000, scale=2)

model.visualize_barchart(top_n_topics=num_topics, width=360)

# This code includes GPT-4 by OpenAI as the LLM to generate labels and summaries for different topics
# Provide the OpenAI API key
config = configparser.ConfigParser()
config.read('config.ini') # The API key was stored in a configuration file to preserve confidentiality
api_key = config['DEFAULT']['OPENAI_API_KEY']

# Define the client for the OpenAI API
client = OpenAI(api_key=api_key)

# Retrieve the final list of topics after the screening
final_topics = model.get_topics()

# Retrieve the representative documents for the final list of topics after the screening
representative_docs = model.get_representative_docs()

# Retrieve the unique, existing topic IDs, excluding any outliers
unique_topics = set(final_topics.keys()) - {-1}

# Prepare to store results
topic_labels = []
topic_documents = {}

# Process each unique topic identified
for topic_id in unique_topics:
    # Get the keywords for the topic
    keywords = model.get_topic(topic_id)
    if keywords is None or not keywords:
        print(f"No keywords found for topic {topic_id}. Skipping.")
        continue
    keyword_list = ', '.join([f"{word} ({weight:.2f})" for word, weight in keywords])

    # Fetch representative documents using BERTopic's method
    if topic_id in representative_docs and representative_docs[topic_id]:
        representative_docs_per_topic = '\n\n'.join(representative_docs[topic_id])
    else:
        print(f"No representative documents found for topic {topic_id}. Skipping.")
        continue

    # Create the prompt for GPT-4
    prompt = f"""
    I have a topic that contains the following representative documents: \n{representative_docs_per_topic}
    The topic is described by the following keywords: {keyword_list}

    Can you summarize this topic with a label and a short paragraph?
    """

    # Send the prompt to GPT-4
    response = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt}
        ],
        model="gpt-4-turbo",
        max_tokens=200,
        temperature=0 # The temperature parameter was set to 0 to make the output 
                      # as deterministic and reproducible as possible
    )

    # Extract the topic label suggested by GPT-4
    topic_label = response.choices[0].message.content.strip()
    topic_labels.append((topic_id, keyword_list, representative_docs_per_topic, topic_label))
    print(f"Topic {topic_id}: {topic_label}")
    print("\n---------\n")


# Save the results to a DataFrame and then to a CSV file
df_labels = pd.DataFrame(topic_labels, columns=['Topic ID', 'Keywords', 'Representative Documents', 'Label'])
df_labels.to_csv('topic_labels_and_summaries_by_GPT.csv', index=False)
print("Labels and summaries saved to 'topic_labels_and_summaries_by_GPT.csv'.")