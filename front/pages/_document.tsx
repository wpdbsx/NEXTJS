import Document, { NextScript, Html, Head, Main, DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheet } from "styled-components"
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

export default class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {

        const cache = createCache();
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {

            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) =>

                    sheet.collectStyles(
                        <StyleProvider cache={cache}>
                            <App {...props} />
                        </StyleProvider>)

            })
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}

                        <script
                            dangerouslySetInnerHTML={{
                                __html: `</script>${extractStyle(cache)}<script>`,
                            }} />
                        {sheet.getStyleElement()}

                    </>
                )
            }
        } catch (error) {
            console.log(error)
        } finally {
            sheet.seal();
        }
    }
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=es2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Cdefault" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }

}