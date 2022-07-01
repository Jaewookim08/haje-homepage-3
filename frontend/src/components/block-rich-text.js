import React from "react";

const BlockRichText = ({ data }) => {
  return (
    <div className={"container"}>
      <div className="prose mx-auto max-w-none py-8">
        <div
          dangerouslySetInnerHTML={{
            __html: data.richTextBody.data.childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
  );
};

export default BlockRichText;
