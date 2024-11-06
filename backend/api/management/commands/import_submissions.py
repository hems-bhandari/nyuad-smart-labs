import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Submission
from django.contrib.auth.models import User

# to run the command: python manage.py import_submissions <path_to_csv_file>

class Command(BaseCommand):
    help = 'Import submissions from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='The path to the CSV file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        df = pd.read_csv(file_path, encoding='ISO-8859-1')  # Specify encoding if needed

        for index, row in df.iterrows():
            a1 = row['response_qual_q1']
            a2 = row['response_qual_q2']
            a3 = row['response_qual_q3']
            a4 = row['response_qual_q4']
            a5 = row['response_qual_q5']

            try:
                employee = User.objects.get(id=1)
                Submission.objects.create(
                    employee=employee,
                    a1=a1,
                    a2=a2,
                    a3=a3,
                    a4=a4,
                    a5=a5,
                    a6='', 
                )
                self.stdout.write(self.style.SUCCESS(f'Successfully added submission for employee {employee.id}'))
            except User.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Employee with id 1 does not exist'))