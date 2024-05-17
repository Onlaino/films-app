import { Heading } from "../Heading/Heading";
import { Paragraph } from "../Paragraph/Paragraph";

export const NoMoviesFound = () => {
	return (
		<div>
			<Heading>Упс... Ничего не найдено</Heading>

			<Paragraph clazz=''>
				Попробуйте изменить запрос или ввести более точное название фильма
			</Paragraph>
		</div>
	);
};
