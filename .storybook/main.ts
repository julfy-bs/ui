// import type { StorybookConfig } from "@storybook/react-vite";
//
// const config: StorybookConfig = {
//   stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
//   addons: [
//     "@storybook/addon-onboarding",
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@chromatic-com/storybook",
//     "@storybook/addon-interactions",
//   ],
//   framework: {
//     name: "@storybook/react-vite",
//     options: {},
//   },
// };
// export default config;

import { dirname, join } from "path";
import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@storybook/addon-interactions"),
		getAbsolutePath("storybook-addon-remix-react-router"),
		'@chromatic-com/storybook'
	],

	core: {
		builder: getAbsolutePath("@storybook/builder-vite"),
	},

	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},

	docs: {},

	viteFinal: async (config) => {
		return {
			...config,
			plugins: await withoutVitePlugins(config.plugins, [
				'vite:lib-inject-css',
			]),
		};
	},

	typescript: {
		reactDocgen: "react-docgen-typescript"
	}
};
export default config;

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}
