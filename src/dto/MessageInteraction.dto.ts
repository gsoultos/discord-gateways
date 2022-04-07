import { GuildMemberDto } from "./GuildMember.dto";
import { UserDto } from "./User.dto";

export class MessageInteractionDto {
    constructor(
        public id: string,
        public type: unknown,
        public name: string,
        public user: UserDto,
        public member?: GuildMemberDto
    ) {}
}