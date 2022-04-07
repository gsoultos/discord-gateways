import { TeamMemberDto } from "./TeamMember.dto";

export class TeamDto {
    constructor(
        public icon: string | null,
        public id: string,
        public members: TeamMemberDto[],
        public name: string,
        public owner_user_id: string
    ) {}
}