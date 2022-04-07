import { UserDto } from "./User.dto";

export class TeamMemberDto {
    constructor(
        public membership_state: number,
        public permissions: string[],
        public team_id: string,
        public user: UserDto
    ) {}
}