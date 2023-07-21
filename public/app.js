const message$ = document.getElementById('message')
const send$ = document.getElementById('send')
const messages$ = document.getElementById('messages')

message$.addEventListener('input', () => {
  if (message$.value) {
    send$.removeAttribute('disabled')
  } else {
    send$.setAttribute('disabled', 'disabled')
  }
})

send$.addEventListener('click', () => {
  const message = message$.value
  const li = document.createElement('li')
  li.innerHTML = message
  messages$.appendChild(li)
  message$.value = ''
  send$.setAttribute('disabled', 'disabled')
})
