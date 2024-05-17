export interface IFilm {
	isAdded?: boolean;
	id: string;
	originalTitleText?: {
		text?: string;
		__typename?: string;
	};
	primaryImage?: {
		caption?: {
			plainText?: string;
			__typename?: string;
		};
		height?: number;
		width?: number;
		id?: string;
		url?: string;
		__typename?: string;
	} | null;
	releaseDate?: object;
	releaseYear?:
		| {
				endYear: number | null;
				year: number;
				__typename: string;
		  }
		| undefined;
	titleText?: {
		text?: string;
		__typename?: string;
	};
	titleType?: {
		id?: string;
		isEpisode?: boolean;
		isSeries?: boolean;
		text?: string;
		__typename?: string;
	};
}
