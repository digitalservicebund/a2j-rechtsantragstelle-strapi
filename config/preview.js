// Function to generate preview pathname based on content type and document
const getPreviewPathname = (uid, { locale, document }) => {
  const { slug, stepId } = document;
  switch (uid) {
    case "api::page.page":
      return slug;
    case "api::result-page.result-page": {
      return `/resultPage/${stepId}`;
    }
    default: {
      return null;
    }
  }
};

export const previewConfig = (url, secret) => ({
  enabled: true,
  config: {
    allowedOrigins: url,
    async handler(uid, { documentId, locale, status }) {
      const document = await strapi.documents(uid).findOne({ documentId });
      const pathname = getPreviewPathname(uid, { locale, document });
      if (!pathname) return null;

      const urlSearchParams = new URLSearchParams({
        url: pathname,
        secret,
        status,
      });
      return `${url}/preview?${urlSearchParams}`;
    },
  },
});
