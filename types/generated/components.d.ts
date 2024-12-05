import type { Attribute, Schema } from '@strapi/strapi';

export interface BasicHeading extends Schema.Component {
  collectionName: 'components_basic_headings';
  info: {
    description: '';
    displayName: 'Heading';
  };
  attributes: {
    look: Attribute.Enumeration<
      [
        'default',
        'ds-heading-01-reg',
        'ds-heading-02-reg',
        'ds-heading-03-reg',
        'ds-heading-03-bold',
        'ds-subhead',
        'ds-label-01-reg',
        'ds-label-01-bold',
        'ds-label-02-reg',
        'ds-label-02-bold',
        'ds-label-03-reg',
        'ds-label-03-bold',
        'ds-label-section',
        'ds-body-01-reg',
        'ds-body-02-reg'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    tagName: Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'h1'>;
    text: Attribute.String & Attribute.Required;
  };
}

export interface BasicLink extends Schema.Component {
  collectionName: 'components_basic_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    text: Attribute.String;
    url: Attribute.String & Attribute.Required;
  };
}

export interface BasicParagraph extends Schema.Component {
  collectionName: 'components_basic_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
  };
  attributes: {
    text: Attribute.RichText & Attribute.Required;
  };
}

export interface FieldField extends Schema.Component {
  collectionName: 'components_field_fields';
  info: {
    description: '';
    displayName: 'Field';
    icon: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.Text & Attribute.Required;
  };
}

export interface FormElementsAutoSuggestInput extends Schema.Component {
  collectionName: 'components_form_elements_auto_suggest_inputs';
  info: {
    description: '';
    displayName: 'AutoSuggestInput';
  };
  attributes: {
    dataList: Attribute.Enumeration<['airports', 'airlines']>;
    errors: Attribute.Relation<
      'form-elements.auto-suggest-input',
      'oneToMany',
      'api::error.error'
    >;
    isDisabled: Attribute.Boolean & Attribute.DefaultTo<false>;
    label: Attribute.String;
    name: Attribute.String;
    noSuggestionMessage: Attribute.String;
    placeholder: Attribute.String;
    width: Attribute.Enumeration<
      [
        'characters3',
        'characters5',
        'characters7',
        'characters10',
        'characters16',
        'characters24',
        'characters36',
        'characters54'
      ]
    >;
  };
}

export interface FormElementsButton extends Schema.Component {
  collectionName: 'components_form_elements_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    fullWidth: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    href: Attribute.String;
    look: Attribute.Enumeration<['primary', 'secondary', 'tertiary', 'ghost']> &
      Attribute.Required &
      Attribute.DefaultTo<'primary'>;
    size: Attribute.Enumeration<['large', 'medium', 'small']> &
      Attribute.Required;
    text: Attribute.String;
  };
}

export interface FormElementsCheckbox extends Schema.Component {
  collectionName: 'components_form_elements_checkboxes';
  info: {
    description: '';
    displayName: 'Checkbox';
    icon: 'check';
  };
  attributes: {
    isRequiredError: Attribute.Relation<
      'form-elements.checkbox',
      'oneToOne',
      'api::error.error'
    >;
    label: Attribute.Text & Attribute.Required;
    name: Attribute.String & Attribute.Required;
  };
}

export interface FormElementsDateInput extends Schema.Component {
  collectionName: 'components_form_elements_date_inputs';
  info: {
    displayName: 'DateInput';
    icon: 'calendar';
  };
  attributes: {
    errors: Attribute.Relation<
      'form-elements.date-input',
      'oneToMany',
      'api::error.error'
    >;
    label: Attribute.String;
    name: Attribute.String & Attribute.Required;
    placeholder: Attribute.String;
  };
}

export interface FormElementsDropdown extends Schema.Component {
  collectionName: 'components_form_elements_dropdowns';
  info: {
    description: '';
    displayName: 'Dropdown';
  };
  attributes: {
    altLabel: Attribute.Text;
    errors: Attribute.Relation<
      'form-elements.dropdown',
      'oneToMany',
      'api::error.error'
    >;
    label: Attribute.Text;
    name: Attribute.String & Attribute.Required;
    options: Attribute.Component<'form-helper.select-option', true>;
    placeholder: Attribute.Text;
    width: Attribute.Enumeration<
      ['characters16', 'characters24', 'characters36', 'characters54']
    >;
  };
}

export interface FormElementsFileInput extends Schema.Component {
  collectionName: 'components_form_elements_file_inputs';
  info: {
    displayName: 'FileInput';
    icon: '';
  };
  attributes: {
    label: Attribute.String;
    name: Attribute.String & Attribute.Required;
  };
}

export interface FormElementsHiddenInput extends Schema.Component {
  collectionName: 'components_form_elements_hidden_inputs';
  info: {
    description: '';
    displayName: 'HiddenInput';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    reason: Attribute.Text & Attribute.Required;
  };
}

export interface FormElementsInput extends Schema.Component {
  collectionName: 'components_basic_inputs';
  info: {
    description: '';
    displayName: 'Input';
  };
  attributes: {
    errors: Attribute.Relation<
      'form-elements.input',
      'oneToMany',
      'api::error.error'
    >;
    helperText: Attribute.String;
    label: Attribute.String;
    name: Attribute.String & Attribute.Required;
    placeholder: Attribute.String;
    suffix: Attribute.String;
    type: Attribute.Enumeration<['text', 'number']> &
      Attribute.Required &
      Attribute.DefaultTo<'text'>;
    width: Attribute.Enumeration<
      [
        'characters3',
        'characters5',
        'characters7',
        'characters10',
        'characters16',
        'characters24',
        'characters36',
        'characters54'
      ]
    >;
  };
}

export interface FormElementsSelect extends Schema.Component {
  collectionName: 'components_basic_selects';
  info: {
    description: '';
    displayName: 'Select';
  };
  attributes: {
    altLabel: Attribute.String;
    errors: Attribute.Relation<
      'form-elements.select',
      'oneToMany',
      'api::error.error'
    >;
    label: Attribute.String;
    name: Attribute.String & Attribute.Required;
    options: Attribute.Component<'form-helper.select-option', true>;
  };
}

export interface FormElementsTextarea extends Schema.Component {
  collectionName: 'components_basic_textareas';
  info: {
    description: '';
    displayName: 'textarea';
  };
  attributes: {
    description: Attribute.RichText;
    details: Attribute.Component<'page.details-summary'>;
    errors: Attribute.Relation<
      'form-elements.textarea',
      'oneToMany',
      'api::error.error'
    >;
    label: Attribute.String;
    name: Attribute.String & Attribute.Required;
    placeholder: Attribute.String;
  };
}

export interface FormElementsTileGroup extends Schema.Component {
  collectionName: 'components_basic_tile_group';
  info: {
    description: '';
    displayName: 'Tiles';
  };
  attributes: {
    altLabel: Attribute.String;
    errors: Attribute.Relation<
      'form-elements.tile-group',
      'oneToMany',
      'api::error.error'
    >;
    label: Attribute.String;
    name: Attribute.String & Attribute.Required;
    options: Attribute.Component<'form-helper.tile', true>;
    useTwoColumns: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface FormElementsTimeInput extends Schema.Component {
  collectionName: 'components_form_elements_time_inputs';
  info: {
    description: '';
    displayName: 'TimeInput';
  };
  attributes: {
    errors: Attribute.Relation<
      'form-elements.time-input',
      'oneToMany',
      'api::error.error'
    >;
    label: Attribute.String;
    name: Attribute.String & Attribute.Required;
    placeholder: Attribute.String;
  };
}

export interface FormHelperErrors extends Schema.Component {
  collectionName: 'components_basic_errors';
  info: {
    description: '';
    displayName: 'Errors';
  };
  attributes: {
    code: Attribute.String;
    text: Attribute.String;
  };
}

export interface FormHelperSelectOption extends Schema.Component {
  collectionName: 'components_basic_select_options';
  info: {
    description: '';
    displayName: 'SelectOption';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
  };
}

export interface FormHelperTile extends Schema.Component {
  collectionName: 'components_basic_tile';
  info: {
    description: '';
    displayName: 'Tile';
  };
  attributes: {
    description: Attribute.RichText;
    image: Attribute.Media<'images'>;
    tagDescription: Attribute.String;
    title: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
  };
}

export interface MetaBackground extends Schema.Component {
  collectionName: 'components_meta_backgrounds';
  info: {
    description: '';
    displayName: 'Outer Background';
  };
  attributes: {
    backgroundColor: Attribute.Enumeration<
      ['default', 'white', 'blue', 'darkBlue', 'yellow']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    paddingBottom: Attribute.Enumeration<
      [
        'default',
        'px0',
        'px8',
        'px16',
        'px24',
        'px32',
        'px40',
        'px48',
        'px56',
        'px64'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    paddingTop: Attribute.Enumeration<
      [
        'default',
        'px0',
        'px8',
        'px16',
        'px24',
        'px32',
        'px40',
        'px48',
        'px56',
        'px64'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
  };
}

export interface MetaContainer extends Schema.Component {
  collectionName: 'components_meta_containers';
  info: {
    description: '';
    displayName: 'Container';
  };
  attributes: {
    backgroundColor: Attribute.Enumeration<
      ['default', 'white', 'blue', 'yellow']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    paddingBottom: Attribute.Enumeration<
      [
        'default',
        'px0',
        'px8',
        'px16',
        'px24',
        'px32',
        'px40',
        'px48',
        'px56',
        'px64'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
    paddingTop: Attribute.Enumeration<
      [
        'default',
        'px0',
        'px8',
        'px16',
        'px24',
        'px32',
        'px40',
        'px48',
        'px56',
        'px64'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'default'>;
  };
}

export interface PageArraySummary extends Schema.Component {
  collectionName: 'components_page_array_summaries';
  info: {
    description: '';
    displayName: 'ArraySummary';
    icon: 'bulletList';
  };
  attributes: {
    category: Attribute.String & Attribute.Required;
    categoryUrl: Attribute.String & Attribute.Required;
  };
}

export interface PageBox extends Schema.Component {
  collectionName: 'components_page_boxes';
  info: {
    description: '';
    displayName: 'Box';
  };
  attributes: {
    buttons: Attribute.Component<'form-elements.button', true>;
    container: Attribute.Component<'meta.container'> & Attribute.Required;
    content: Attribute.Component<'basic.paragraph'>;
    heading: Attribute.Component<'basic.heading'>;
    identifier: Attribute.String;
    label: Attribute.Component<'basic.heading'>;
    outerBackground: Attribute.Component<'meta.background'>;
  };
}

export interface PageBoxWithImage extends Schema.Component {
  collectionName: 'components_page_box_with_images';
  info: {
    description: '';
    displayName: 'BoxWithImage';
  };
  attributes: {
    container: Attribute.Component<'meta.container'> & Attribute.Required;
    content: Attribute.RichText;
    heading: Attribute.Component<'basic.heading'>;
    identifier: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    outerBackground: Attribute.Component<'meta.background'>;
    variant: Attribute.Enumeration<['ImgMTextL']>;
  };
}

export interface PageDetailsSummary extends Schema.Component {
  collectionName: 'components_page_details_summary';
  info: {
    description: '';
    displayName: 'DetailsSummary';
  };
  attributes: {
    content: Attribute.RichText & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface PageHeader extends Schema.Component {
  collectionName: 'components_page_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    container: Attribute.Component<'meta.container'> & Attribute.Required;
    content: Attribute.Component<'basic.paragraph'>;
    heading: Attribute.Component<'basic.heading'> & Attribute.Required;
    outerBackground: Attribute.Component<'meta.background'>;
  };
}

export interface PageInfoBox extends Schema.Component {
  collectionName: 'components_page_info_boxes';
  info: {
    description: '';
    displayName: 'InfoBox';
  };
  attributes: {
    container: Attribute.Component<'meta.container'> & Attribute.Required;
    heading: Attribute.Component<'basic.heading'>;
    identifier: Attribute.String;
    items: Attribute.Component<'page.info-box-item', true>;
    outerBackground: Attribute.Component<'meta.background'>;
    separator: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface PageInfoBoxItem extends Schema.Component {
  collectionName: 'components_page_info_box_items';
  info: {
    description: '';
    displayName: 'InfoBoxItem';
  };
  attributes: {
    buttons: Attribute.Component<'form-elements.button', true>;
    content: Attribute.RichText;
    detailsSummary: Attribute.Component<'page.details-summary', true>;
    headline: Attribute.Component<'basic.heading'>;
    identifier: Attribute.String;
    image: Attribute.Media<'images'>;
    label: Attribute.Component<'basic.heading'>;
  };
}

export interface PageInlineNotice extends Schema.Component {
  collectionName: 'components_page_inline_notice';
  info: {
    description: 'A notice component with a fixed title label-01-bold. The component works in FormFlow Page, Vorabcheck Page, and Content Page';
    displayName: 'InlineNotice';
  };
  attributes: {
    container: Attribute.Component<'meta.container'> & Attribute.Required;
    content: Attribute.RichText;
    identifier: Attribute.String;
    look: Attribute.Enumeration<['warning', 'tips']> &
      Attribute.Required &
      Attribute.DefaultTo<'warning'>;
    outerBackground: Attribute.Component<'meta.background'>;
    tagName: Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'h1'>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface PageLinkListBox extends Schema.Component {
  collectionName: 'components_page_link_list_boxes';
  info: {
    description: '';
    displayName: 'LinkListBox';
  };
  attributes: {
    buttons: Attribute.Component<'form-elements.button', true>;
    container: Attribute.Component<'meta.container'> & Attribute.Required;
    heading: Attribute.Component<'basic.heading'>;
    identifier: Attribute.String;
    label: Attribute.Component<'basic.heading'>;
    links: Attribute.Component<'basic.link', true>;
    outerBackground: Attribute.Component<'meta.background'>;
  };
}

export interface PageList extends Schema.Component {
  collectionName: 'components_page_lists';
  info: {
    description: '';
    displayName: 'List';
  };
  attributes: {
    container: Attribute.Component<'meta.container'> & Attribute.Required;
    heading: Attribute.Component<'basic.heading'>;
    identifier: Attribute.String;
    isNumeric: Attribute.Boolean & Attribute.DefaultTo<true>;
    items: Attribute.Component<'page.list-item', true>;
    outerBackground: Attribute.Component<'meta.background'>;
    subheading: Attribute.RichText;
  };
}

export interface PageListItem extends Schema.Component {
  collectionName: 'components_page_list_items';
  info: {
    description: '';
    displayName: 'ListItem';
  };
  attributes: {
    buttons: Attribute.Component<'form-elements.button', true>;
    content: Attribute.RichText;
    headline: Attribute.Component<'basic.heading'>;
    identifier: Attribute.String;
  };
}

export interface PageMetaPageInfo extends Schema.Component {
  collectionName: 'components_page_meta_page_infos';
  info: {
    description: '';
    displayName: 'MetaPageInfo';
  };
  attributes: {
    breadcrumb: Attribute.Text & Attribute.Required;
    description: Attribute.Text;
    ogTitle: Attribute.Text;
    title: Attribute.String & Attribute.Required;
  };
}

export interface PageNavigationItem extends Schema.Component {
  collectionName: 'components_page_navigation_items';
  info: {
    description: '';
    displayName: 'Navigation Item';
  };
  attributes: {
    baseurl: Attribute.String;
    targeturl: Attribute.String;
    text: Attribute.String & Attribute.Required;
  };
}

export interface PageUserFeedback extends Schema.Component {
  collectionName: 'components_page_user_feedbacks';
  info: {
    displayName: 'UserFeedback';
  };
  attributes: {
    headingRating: Attribute.String & Attribute.Required;
  };
}

export interface PageVideo extends Schema.Component {
  collectionName: 'components_page_videos';
  info: {
    description: '';
    displayName: 'Video';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'basic.heading': BasicHeading;
      'basic.link': BasicLink;
      'basic.paragraph': BasicParagraph;
      'field.field': FieldField;
      'form-elements.auto-suggest-input': FormElementsAutoSuggestInput;
      'form-elements.button': FormElementsButton;
      'form-elements.checkbox': FormElementsCheckbox;
      'form-elements.date-input': FormElementsDateInput;
      'form-elements.dropdown': FormElementsDropdown;
      'form-elements.file-input': FormElementsFileInput;
      'form-elements.hidden-input': FormElementsHiddenInput;
      'form-elements.input': FormElementsInput;
      'form-elements.select': FormElementsSelect;
      'form-elements.textarea': FormElementsTextarea;
      'form-elements.tile-group': FormElementsTileGroup;
      'form-elements.time-input': FormElementsTimeInput;
      'form-helper.errors': FormHelperErrors;
      'form-helper.select-option': FormHelperSelectOption;
      'form-helper.tile': FormHelperTile;
      'meta.background': MetaBackground;
      'meta.container': MetaContainer;
      'page.array-summary': PageArraySummary;
      'page.box': PageBox;
      'page.box-with-image': PageBoxWithImage;
      'page.details-summary': PageDetailsSummary;
      'page.header': PageHeader;
      'page.info-box': PageInfoBox;
      'page.info-box-item': PageInfoBoxItem;
      'page.inline-notice': PageInlineNotice;
      'page.link-list-box': PageLinkListBox;
      'page.list': PageList;
      'page.list-item': PageListItem;
      'page.meta-page-info': PageMetaPageInfo;
      'page.navigation-item': PageNavigationItem;
      'page.user-feedback': PageUserFeedback;
      'page.video': PageVideo;
    }
  }
}
