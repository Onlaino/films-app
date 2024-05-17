import { CSSProperties, ReactNode } from "react";

export interface ParagraphProps  {
	children: ReactNode;
	clazz?: string;
	style?: CSSProperties;
}