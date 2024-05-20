import type { FC } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

interface SeoProps {
  title?: string;
}

export const Seo: FC<SeoProps> = (props) => {
  const { title } = props;

  const fullTitle = title ? title + " | M&C Bình Dương" : "M&C Bình Dương";

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
