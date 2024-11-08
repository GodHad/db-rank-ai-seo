import { InertiaHead } from "@inertiajs/inertia-react"
import { APP_URL } from "../../../variables/statics"
import { Helmet } from "react-helmet"

export default ({ content, title }) => {
    return (
        <>
            <Helmet>
                <title>DB Rank AI | {title}</title>
            </Helmet>
            <InertiaHead>
                {content && content.meta_description && <meta name="description" content={content.meta_description} />}
                {content && content.meta_title && <meta property="og:title" content={content.meta_title} />}
                {content && content.meta_description && <meta property="og:description" content={content.meta_description} />}
                {content && content.og_graph_image && <meta property="og:image" content={`${APP_URL}storage/${content.og_graph_image}`} />}
                {typeof window !== "undefined" && <meta property="og:url" content={window.location.href} />}

                <meta name="twitter:card" content="summary_large_image" />
                {content && content.meta_title && <meta name="twitter:title" content={content.meta_title} />}
                {content && content.meta_description && <meta name="twitter:description" content={content.meta_description} />}
                {content && content.twitter_graph_image && <meta name="twitter:image" content={`${APP_URL}storage/${content.twitter_graph_image}`} />}
            </InertiaHead>
        </>
    )
}