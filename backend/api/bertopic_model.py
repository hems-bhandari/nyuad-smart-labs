from bertopic import BERTopic
from sklearn.feature_extraction.text import CountVectorizer
from umap import UMAP
from hdbscan import HDBSCAN
import pandas as pd
import os
import csv
from bertopic.representation import OpenAI
import openai

api_key = "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"
if not api_key:
    raise ValueError("The OPENAI_API_KEY environment variable is not set.")
openai.api_key = api_key

def run_bertopic_model(documents):
    vectorizer_model = CountVectorizer(stop_words='english', ngram_range=(1, 2))
    umap_model = UMAP(n_neighbors=15, n_components=5, min_dist=0.0, metric='cosine', random_state=42)
    hdbscan_model = HDBSCAN(min_cluster_size=10, min_samples=10, metric='euclidean', prediction_data=True)
    
    # Initialize OpenAI client
    openai_client = openai
    
    # Initialize BERTopic with OpenAI representation
    representation_model = OpenAI(client=openai_client)
    model = BERTopic(vectorizer_model=vectorizer_model, umap_model=umap_model, hdbscan_model=hdbscan_model, representation_model=representation_model, nr_topics="auto")
    
    topics, _ = model.fit_transform(documents)
    return topics, model

def process_and_save_topics(input_csv, output_csv):
    # Load the dataset
    df = pd.read_csv(input_csv)
    documents = df['Segmented Text'].tolist()

    # Run the BERTopic model
    topics, model = run_bertopic_model(documents)

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
    topics_df.to_csv(output_csv, index=False, quoting=csv.QUOTE_NONNUMERIC)
    print(f"BERTopic analysis results have been saved to '{output_csv}'.")