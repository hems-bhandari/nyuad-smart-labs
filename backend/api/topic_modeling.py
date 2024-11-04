def run_topic_modeling():
    import pandas as pd
    from bertopic import BERTopic
    df = pd.read_excel('Responses.xlsx')
    df['concat'] = df[['a1', 'a2', 'a3', 'a4', 'a5']].apply(lambda x: ' '.join(x), axis=1)
    documents = df['concat'].tolist()

    # initialize
    model = BERTopic()
    topics, probs = model.fit_transform(documents)

    # get topic
    topic_info = model.get_topic_info()
    topic_info.to_csv('bertopic_results.csv', index=False)

    # save topics to db
    from .models import TopicModelOutput
    for index, row in topic_info.iterrows():
        TopicModelOutput.objects.update_or_create(
            topic_id=row['Topic'],
            defaults={
                'name': row['Name'],
                'count': row['Count'],
            }
        )