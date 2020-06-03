import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/user';

interface RequestDTO {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

class AuthenticateUserService {
	public async execute({ email, password }: RequestDTO): Promise<Response> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne({
			where: { email },
		});

		if (!user) {
			throw new Error('Incorrect email/password combination.');
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new Error('Incorrect email/password combination.');
		}

		const token = sign({}, 'a83920d1348eee579e4d5e2037b93657', {
			subject: user.id,
			expiresIn: '1d',
		});

		return { user, token };
	}
}

export default AuthenticateUserService;
