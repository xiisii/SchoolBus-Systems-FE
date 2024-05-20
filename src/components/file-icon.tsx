import type { FC } from 'react';
import PropTypes from 'prop-types';

type Extension = 'jpeg' | 'jpg' | 'mp4' | 'pdf' | 'png' | string;

const icons: Record<Extension, any> = {
  jpeg: '/assets/icons/icon-jpg.svg',
  jpg: '/assets/icons/icon-jpg.svg',
  mp4: '/assets/icons/icon-mp4.svg',
  pdf: '/assets/icons/icon-pdf.svg',
  png: '/assets/icons/icon-png.svg',
  svg: '/assets/icons/icon-svg.svg'
};

interface FileIconProps {
  extension?: Extension | null;
}

export const FileIcon: FC<FileIconProps> = (props) => {
  const { extension } = props;

  let icon: string;

  if (!extension) {
    icon = '/assets/icons/icon-other.svg';
  } else {
    icon = icons[extension] || '/assets/icons/icon-other.svg';
  }

  return <img src={icon} />;
};

FileIcon.propTypes = {
  extension: PropTypes.string
};
