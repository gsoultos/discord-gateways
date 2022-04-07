import { EmbedAuthorDto } from "./EmbedAuthor.dto";
import { EmbedFieldDto } from "./EmbedField.dto";
import { EmbedFooterDto } from "./EmbedFooter.dto";
import { EmbedImageDto } from "./EmbedImage.dto";
import { EmbedProviderDto } from "./EmbedProvider.dto";
import { EmbedThumbnailDto } from "./EmbedThumbnail.dto";
import { EmbedVideoDto } from "./EmbedVideo.dto";

export class EmbedDto {
    constructor(
        public title?: string,
        public type?: string,
        public description?: string,
        public url?: string,
        public timestamp?: Date,
        public color?: number,
        public footer?: EmbedFooterDto,
        public image?: EmbedImageDto,
        public thumbnail?: EmbedThumbnailDto,
        public video?: EmbedVideoDto,
        public provider?: EmbedProviderDto,
        public author?: EmbedAuthorDto,
        public fields?: EmbedFieldDto[]
    ) {}
}