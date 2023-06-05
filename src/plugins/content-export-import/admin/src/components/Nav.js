import React from 'react';
import {
  SubNav,
  SubNavHeader,
  SubNavSections,
  SubNavLink,
} from '@strapi/design-system/SubNav';
import Upload from '@strapi/icons/Upload';
import Download from '@strapi/icons/Download';
import Book from '@strapi/icons/Book';

import pluginId from '../pluginId';
import { getUrl } from '../utils/getUrl';

const Nav = () => {
  return (
    <SubNav ariaLabel="Content Export">
      <SubNavHeader label="Content Export" />
      <SubNavSections>
        <SubNavLink to={getUrl(pluginId, "export")} icon={<Download />}>
          Export
        </SubNavLink>
      </SubNavSections>
    </SubNav>)
};

export default Nav;
