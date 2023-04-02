from SmartGPTUtil import get_answer

rel_name = ''
print('\nWelcome to SmartGPT!\nYou can ask me any question and I am here to help you.')

# Define a loop to get user input and generate responses
while True:
    # Get user input
    #print('Current relevance: ', rel_name, '\n')
    question = input('\nPlease enter your question: ').lower()
    if question == 'bye':
        print('It was nice talking to you\n')
        break
    else:
        result = get_answer(question, rel_name)
        rel_name = result['rel_name']
        print(result['answer'])