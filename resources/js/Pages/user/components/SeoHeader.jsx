import { InertiaHead } from "@inertiajs/inertia-react"
import { APP_URL } from "../../../variables/statics"

export default ({ content }) => {
    return (
        <>
            {/* <Helmet>
                
            </Helmet> */}
            <InertiaHead>
                {typeof window !== 'undefined' && <meta property="og:url" content="https://github.com/GodHad"/>}
                {content && content.meta_title ? <title>{content.meta_title}</title> : <title>DB Rank AI</title>}
                {content && content.meta_title && <meta name="twitter:title" content={content.meta_title} />}
                {content && content.meta_title && <meta property="og:title" content={content.meta_title} />}
                {content && content.meta_description && <meta name="description" content={content.meta_description} />}
                {content && content.meta_description && <meta name="twitter:description" content={content.meta_description} />}
                {content && content.meta_description && <meta property="og:description" content={content.meta_description} />}
                {content && content.meta_description && <meta property="og:image:alt" content={content.meta_description} />}
                {content && content.twitter_graph_image && <meta name="twitter:image" content={`${APP_URL}storage/${content.twitter_graph_image}`} />}
                {content && content.og_graph_image && <meta property="og:image" content={`${APP_URL}storage/${content.og_graph_image}`} />}
            </InertiaHead>
        </>
    )
}