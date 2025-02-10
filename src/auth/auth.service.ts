import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throws } from 'assert';
import { CryptService } from 'src/crypt/crypt.service';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly cryptService: CryptService,
    ) { }

    async validateAttendant(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findAttendantByEmail(email);
        if (user && await this.cryptService.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateRequester(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findRequesterByEmail(email);
        if (user && await this.cryptService.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string) {
        let user = await this.validateAttendant(email, password);
        if (!user)
            user = await this.validateRequester(email, password);

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
