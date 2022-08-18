//Global

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const polybiusTable = ['11', '12', '13', '14', '15', '21', '22', '23', '24', '24', '25', '31', '32', '33', '34', '35', '41', '42', '43', '44', '45', '51', '52', '53', '54', '55']
const vigenereDictionaire = { "a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7, "i": 8, "j": 9, "k": 10, "l": 11, "m": 12, "n": 13, "o": 14, "p": 15, "q": 16, "r": 17, "s": 18, "t": 19, "u": 20, "v": 21, "w": 22, "x": 23, "y": 24, "z": 25, "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "w": 22, "X": 23, "Y": 24, "Z": 25 }
var key = 0

//Layer 1 - Comunicators

function output(id, msg) {
	document.getElementById(id).innerHTML = msg;
	document.getElementById(id).value = msg;
	console.log(msg)
}

function input(inputId, command, outputId) {
	msg = document.getElementById(inputId).value
	console.log(inputId, command, outputId, msg)
	handleEvent(inputId, command, outputId, msg)
}

function keyListener() {
	document.addEventListener('keydown', handleKeydown)
}
//keyListener()

function handleKeydown(){
}

//Layer 2 - Modifiers

function clearValue(inputId){
	document.getElementById(inputId).value = ''
}

function handleSelection(selection) {
	pages = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6']
	console.log(selection)
	for (i in pages) {
		page = pages[i]
		if (page === selection) {
			document.getElementById(selection).style.display = '';
		} else {
			document.getElementById(page).style.display = 'none';
		}
	}
}
handleSelection('page1')

function changeColor(id, color){
		document.getElementById(id).style.backgroundColor = color;
}

function changeDisplay(id, command) {
	document.getElementById(id).style.display = command;
}

function unchangeColor(id) {
	document.getElementById(id).style.backgroundColor = '';
}

function handleEvent(inputId, command, outputId, msg) {
	
	if (inputId === 'polybius input'){
		if (command == 'encrypt'){
			msg = polybius(msg)
			output(outputId, msg)

		}else if (command == 'decrypt'){
			msg = polybiusDecrypt(msg)
			output(outputId, msg)
		}
		clearValue(inputId)

	} else if (inputId === 'caesar input') {
		if (command === 'encrypt'){
			msg = caesar(msg, key)
			output(outputId, msg)
		}else {
			msg = caesarDecrypt(msg, key)
			output(outputId, msg)
		}

	} else if (inputId === 'substitution input') {
		if (command == 'encrypt'){
			msg = substitution(msg, newAlphabet)
			output(outputId, msg)
		}else {
			msg = substitutionDecrypt(msg, newAlphabet)
			output(outputId, msg)
		}
		clearValue(inputId)

	}else if (inputId === 'vigenere input') {
		if (command == 'encrypt') {
			msg = vigenere(password, msg)
			output(outputId, msg)

		} else if (command == 'decrypt') {
			msg = vigenereDecrypt(password, msg)
			output(outputId, msg)
		}
		clearValue(inputId)

	} else if (inputId === 'generate alphabet'){
		msg = generateAlphabet()
		globalThis.newAlphabet = msg
		output(outputId, msg)

	} else if (inputId === 'set alphabet') {
		globalThis.newAlphabet = msg
		output(outputId, msg)

	} else if (inputId === 'set password') {
		globalThis.password = msg

	} else if (inputId === 'rotate up') {
		key = rotate()
		//input('caesar input','encrypt', 'caesar output')
		output(outputId, key)

	} else if (inputId === 'rotate down') {
		key = rotateBack()
		//input('caesar input','decrypt','caesar output')
		output(outputId, key)
	}
}

function rotate() {
	key++
	if (key > 25)
		key = 0
	return key
}

function rotateBack() {
	key--
	if (key < 0)
		key = key + 26
	return key
}

//Layer 3 - Collateral Functions
//Pt. 1 - Sanitizers

function removeAccent(string) {
	newstring = string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	return newstring
}

function turnIntoPairs(msg){
	msgCopy = []
	pairs = []

	for (i in msg) {
		j = msg[i]
		if (numbers.includes(j) == false) {
			msgCopy.push(j + ' ')
		} else
			msgCopy.push(j)
	}
	msgCopy = msgCopy.join('')

	for (i in msgCopy) {
		if (parseInt(i) % 2 === 0) {
			j = parseInt(i) + 1
			pairs.push(msgCopy[i] + msgCopy[j])
		}
	}
	return pairs
}

//Pt.2 Support Functions

function createDictionaire(newAlphabet) {
	var dictionaire = {}
	for (i = 0; i < 26; i++) {
		j = alphabet[i]
		dictionaire[j] = newAlphabet[i]
	}
	return dictionaire
}

function reverseDictionaire(newAlphabet){
	var dictionaire = {}
	for (i = 0; i < 26; i++) {
		j = newAlphabet[i]
		dictionaire[j] = alphabet[i]
	}
	return dictionaire
}

function keyDictionaire() {
	dictionaire = {}
	for (i in alphabet) {
		j = alphabet[i]
		dictionaire[j] = parseInt(i)
	}
	return dictionaire
}

function decryptPairs(pairs){
	result = []
	for (i in pairs) {
		j = pairs[i]
		if (polybiusTable.includes(j)) {
			result.push(dictionaire[j])
		} else
			result.push(j[0])
	}
	result = result.join('')
	return result
}

function generateAlphabet() {
	newAlphabet = []
	while (newAlphabet.length != 26) {
		x = Math.random() * 26
		x = parseInt(x)
		x = alphabet[x]
		if (newAlphabet.includes(x) == false) {
			newAlphabet.push(x);
		}
	}
	newAlphabet = newAlphabet.join('')
	return newAlphabet
}

function rotateAlphabet(key) {
	newAlphabet = []
	dictionaire = {}
	n = 26 - key
	if (n == 26)
		n = 0

	for (letter = 0; letter < alphabet.length; letter++) {
		dictionaire[n] = alphabet[letter]
		n++
		if (n > 25)
			n -= 26
	}
	for (i in dictionaire) {
		newAlphabet.push(dictionaire[i])
	}
	newAlphabet = newAlphabet.join('')

	return newAlphabet
}

function substitute(msg) {
	result = []
	for (i in msg) {
		i = msg[i]

		if (alphabet.includes(i) == true) {
			result.push(dictionaire[i]);
		} else if (Alphabet.includes(i) == true) {
			i = i.toLowerCase()
			i = dictionaire[i]
			i = i.toUpperCase()
			result.push(i)
		} else {
			result.push(i)
		}
	}
	result = result.join('')
	return result
}

//layer 4 - Encrypt

function polybius(msg){
	msg = removeAccent(msg)
	dictionaire = createDictionaire(polybiusTable)
	encryption = substitute(msg)
	return encryption
}

function polybiusDecrypt(msg){
	pairs = turnIntoPairs(msg)
	dictionaire = reverseDictionaire(polybiusTable)
	decryption = decryptPairs(pairs)
	return decryption
}

function caesar(msg, key){
	msg = removeAccent(msg)
	newAlphabet = rotateAlphabet(key)
	dictionaire = createDictionaire(newAlphabet)
	encryption = substitute(msg)
	return encryption
}

function caesarDecrypt(msg, key) {
	msg = removeAccent(msg)
	newAlphabet = rotateAlphabet(26 - key)
	dictionaire = createDictionaire(newAlphabet)
	encryption = substitute(msg)
	return encryption
}

function substitution(msg, newAlphabet){
	msg = removeAccent(msg)
	dictionaire = createDictionaire(newAlphabet)
	encryption = substitute(msg)
	return encryption
}

function substitutionDecrypt(msg, newAlphabet) {
	msg = removeAccent(msg)
	dictionaire = reverseDictionaire(newAlphabet)
	encryption = substitute(msg)
	return encryption
}

function convertPasswordIntoNumbers(password){
	var numericPassword = []
	for (i in password) {
		i = password[i];
		numericPassword.push(vigenereDictionaire[i])
	}
	return numericPassword
}

function vigenere(password,msg){
	var encryption = []
	msg = removeAccent(msg)
	numericPassword = convertPasswordIntoNumbers(password)
	npindex = 0
	for(i in msg){
		if(npindex === numericPassword.length){
			npindex = 0
		}
		letter = msg[i]
		key = numericPassword[npindex]
		var newLetter = caesar(letter,key)
		encryption.push(newLetter)
		
		if (alphabet.includes(newLetter) === true){
			npindex ++
		} else if (Alphabet.includes(newLetter === true)){
			npindex ++
		}
	}
	encryption = encryption.join('')
	return encryption
}

function vigenereDecrypt(password, msg) {
	var encryption = []
	msg = removeAccent(msg)
	numericPassword = convertPasswordIntoNumbers(password)
	npindex = 0
	for (i in msg) {
		if (npindex === numericPassword.length) {
			npindex = 0
		}
		letter = msg[i]
		key = numericPassword[npindex]
		var newLetter = caesarDecrypt(letter, key)
		encryption.push(newLetter)
		if (alphabet.includes(newLetter) === true){
			npindex++
		} else if (Alphabet.includes(newLetter) === true){
			npindex++
		}
	}
	encryption = encryption.join('')
	return encryption
}