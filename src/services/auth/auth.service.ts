import { Payload } from "src/auth/payload";


export class AuthService {
  
    async createToken(user: user): Promise<Token> {
        const payload: Payload = {
            id: user.id,
            email: user.email,
            password: user.passwd,
        };

        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload,this.generateRefreshToken(payload);
}