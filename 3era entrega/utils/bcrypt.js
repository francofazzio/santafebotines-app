import bcrypt from 'bcrypt';

function hashPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
}

function isValidPassword(plainPassword, hashedPassword) {
	return bcrypt.compareSync(plainPassword, hashedPassword);
}

export { hashPassword, isValidPassword };