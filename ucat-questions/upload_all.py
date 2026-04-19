import boto3
import json
import os
import sys
from botocore.exceptions import NoCredentialsError, ClientError

def upload_questions():
    print("🚀 Starting UCAT Question Upload to DynamoDB...\n")

    try:
        dynamodb = boto3.resource('dynamodb', region_name='eu-west-2')
        table = dynamodb.Table('medexam-questions')
        # Quick connectivity check
        table.load()
    except NoCredentialsError:
        print("❌ ERROR: AWS credentials not found.")
        print("   Set credentials via:")
        print("   export AWS_ACCESS_KEY_ID=your_key")
        print("   export AWS_SECRET_ACCESS_KEY=your_secret")
        sys.exit(1)
    except ClientError as e:
        print(f"❌ AWS Error: {e.response['Error']['Message']}")
        sys.exit(1)

    files = ['VR.json', 'DM.json', 'QR.json', 'AR.json', 'SJT.json']
    total_uploaded = 0
    total_failed = 0

    for filename in files:
        filepath = os.path.join(os.path.dirname(__file__), 'questions', filename)
        subtest = filename.replace('.json', '')

        if not os.path.exists(filepath):
            print(f"⚠️  Skipping {filename} — file not found")
            continue

        with open(filepath, 'r') as f:
            questions = json.load(f)

        print(f"📚 Uploading {len(questions)} {subtest} questions...")
        uploaded = 0
        failed = 0

        for q in questions:
            try:
                table.put_item(Item=q)
                print(f"   ✅ {q['questionId']}")
                uploaded += 1
            except Exception as e:
                print(f"   ❌ Failed {q.get('questionId', '?')}: {e}")
                failed += 1

        print(f"   → {subtest} complete: {uploaded} uploaded, {failed} failed\n")
        total_uploaded += uploaded
        total_failed += failed

    print("=" * 50)
    print(f"🎉 Upload complete!")
    print(f"   Total uploaded: {total_uploaded}")
    print(f"   Total failed:   {total_failed}")
    print(f"   Table: medexam-questions (eu-west-2)")

if __name__ == '__main__':
    upload_questions()
