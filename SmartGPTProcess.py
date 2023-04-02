from SmartGPTUtil import get_answer
import sys

if len(sys.argv) < 2:
    print({'answer': 'No question asked', 'rel_name': ''})
    exit()

question = ''
if sys.argv[1]:
    question = sys.argv[1]
rel_name = ''
if len(sys.argv) > 2 and sys.argv[2]:
    rel_name = sys.argv[2]

if question == 'bye':
    print({'answer': 'It was nice talking to you\n', 'rel_name': ''})
else:
    result = get_answer(question, rel_name)
    print(result)