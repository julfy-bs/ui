import type { Preview } from '@storybook/react';
import { ReactNode } from 'react';
import { AppProvider } from '../src/app';

import './preview.scss';

function IsolateContainer({ children }: { children: ReactNode }) {
	return <>
		{ children }
	</>;
}

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<AppProvider>
				<IsolateContainer>
					<Story />
				</IsolateContainer>
			</AppProvider>
		),
	],
};

export default preview;
