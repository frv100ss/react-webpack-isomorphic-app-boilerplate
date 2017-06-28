import React from "react";
// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
export function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {

        constructor(props) {
            super(props);
            this.Component = null;
            this.state = {Component: AsyncComponent.Component};
        }

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    AsyncComponent.Component = Component;
                    this.setState({Component})
                })
            }
        }

        render() {
            const {Component} = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}

// const LoadingMsg = () => {
//     return (
//         <div id='loadMsg'>waiting Message</div>
//     )
// };


export const HomePageSwitcher = asyncComponent(() =>
    System.import('../frontOffice/containers/HomePageSwitcher').then(module => module.default)
);

export const LoginPage = asyncComponent(() =>
    System.import('../frontOffice/containers/LoginPage').then(module => module.default)
);

export const SignUpPage = asyncComponent(() =>
    System.import('../frontOffice/containers/SignUpPage').then(module => module.default)
);
export const CreateArticlePage = asyncComponent(() =>
    System.import('../backOffice/containers/CreateArticlePage').then(module => module.default)
);

export const UpdateArticlePage = asyncComponent(() =>
    System.import('../backOffice/containers/UpdateArticlePage').then(module => module.default)
);

export const PreviewArticlePage = asyncComponent(() =>
    System.import('../backOffice/containers/PreviewArticlePage').then(module => module.default)
);
export const ArticlePage = asyncComponent(() =>
    System.import('../frontOffice/containers/ArticlePage').then(module => module.default)
);



