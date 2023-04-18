class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
        this.rel_name = '';
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    async onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let question = textField.value
        if (question === "") {
            return;
        }

        let msg1 = { name: "Me", message: question }
        this.messages.push(msg1);
        this.updateChatText(chatbox)
        textField.value = ''

        fetch('http://localhost:3000/api?question='+question+'&rel_name='+this.rel_name, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(r => {
            //console.log(r.text());
            return r.json();
          })
          .then(r => {
            console.log(r);
            let answer = r.answer.replace(/\n/g, "<BR>");
            let msg2 = { name: "SmartGPT", message: answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            this.rel_name = r.rel_name;
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Me")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();