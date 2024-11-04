import pandas as pd
from .models import Submission

def process_submissions():
    submissions = Submission.objects.all()
    data = []

    for submission in submissions:
        data.append({
            'a1': submission.a1,
            'a2': submission.a2,
            'a3': submission.a3,
            'a4': submission.a4,
            'a5': submission.a5,
        })
    
    df = pd.DataFrame(data)
    df.to_excel('Responses.xlsx', index=False)
    
    from .topic_modeling import run_topic_modeling
    run_topic_modeling()