Site is hosted: https://facial-recognition-shipos.herokuapp.com/
Server Repository: https://github.com/Demiurgis/facial-recognition-server

A responsive React App that recognizes the presence of a face in a photograph. Utilizes a REST server API with Express and Node.js. Registration and Sign-In utilizes a PostgreSQL database. API for facial recognition provided by Clarifai API.

Base project completed as a code-along for Udemy- Zero to Mastery class.

ToDo List:
	add enter key functionality
	fix broken image link in some browsers <img> => <object>
	clear input upon submission
	if no face is found => notice should alert such and entries should not increase
	if face found => notice that a face was found
	particles.js => 
		fix left padding issue. 
		fix particles updating with state change. 
		fix skewing upon load.
	add register warning about password security