import type { Schema, Struct } from '@strapi/strapi';

export interface BasicHeading extends Struct.ComponentSchema {
  collectionName: 'components_basic_headings';
  info: {
    description: '';
    displayName: 'Heading';
  };
  attributes: {
    look: Schema.Attribute.Enumeration<
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
        'ds-body-02-reg',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
    tagName: Schema.Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'h1'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BasicLink extends Struct.ComponentSchema {
  collectionName: 'components_basic_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BasicParagraph extends Struct.ComponentSchema {
  collectionName: 'components_basic_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
  };
  attributes: {
    text: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface FieldField extends Struct.ComponentSchema {
  collectionName: 'components_field_fields';
  info: {
    description: '';
    displayName: 'Field';
    icon: '';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface FormElementsAutoSuggestInput extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_auto_suggest_inputs';
  info: {
    description: '';
    displayName: 'AutoSuggestInput';
  };
  attributes: {
    dataList: Schema.Attribute.Enumeration<['airports', 'airlines']>;
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    isDisabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    noSuggestionMessage: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    width: Schema.Attribute.Enumeration<
      [
        'characters3',
        'characters5',
        'characters7',
        'characters10',
        'characters16',
        'characters24',
        'characters36',
        'characters54',
      ]
    >;
  };
}

export interface FormElementsButton extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    fullWidth: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String;
    look: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary', 'ghost']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
    size: Schema.Attribute.Enumeration<['large', 'medium', 'small']> &
      Schema.Attribute.Required;
    text: Schema.Attribute.String;
  };
}

export interface FormElementsCheckbox extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_checkboxes';
  info: {
    description: '';
    displayName: 'Checkbox';
    icon: 'check';
  };
  attributes: {
    isRequiredError: Schema.Attribute.Relation<'oneToOne', 'api::error.error'>;
    label: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormElementsDateInput extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_date_inputs';
  info: {
    displayName: 'DateInput';
    icon: 'calendar';
  };
  attributes: {
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
  };
}

export interface FormElementsDropdown extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_dropdowns';
  info: {
    description: '';
    displayName: 'Dropdown';
  };
  attributes: {
    altLabel: Schema.Attribute.Text;
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    label: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'form-helper.select-option', true>;
    placeholder: Schema.Attribute.Text;
    width: Schema.Attribute.Enumeration<
      ['characters16', 'characters24', 'characters36', 'characters54']
    >;
  };
}

export interface FormElementsFileInput extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_file_inputs';
  info: {
    displayName: 'FileInput';
    icon: '';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormElementsHiddenInput extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_hidden_inputs';
  info: {
    description: '';
    displayName: 'HiddenInput';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    reason: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface FormElementsInput extends Struct.ComponentSchema {
  collectionName: 'components_basic_inputs';
  info: {
    description: '';
    displayName: 'Input';
  };
  attributes: {
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    helperText: Schema.Attribute.String;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['text', 'number']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
    width: Schema.Attribute.Enumeration<
      [
        'characters3',
        'characters5',
        'characters7',
        'characters10',
        'characters16',
        'characters24',
        'characters36',
        'characters54',
      ]
    >;
  };
}

export interface FormElementsSelect extends Struct.ComponentSchema {
  collectionName: 'components_basic_selects';
  info: {
    description: '';
    displayName: 'Select';
  };
  attributes: {
    altLabel: Schema.Attribute.String;
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'form-helper.select-option', true>;
  };
}

export interface FormElementsTextarea extends Struct.ComponentSchema {
  collectionName: 'components_basic_textareas';
  info: {
    description: '';
    displayName: 'textarea';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    details: Schema.Attribute.Component<'page.details-summary', false>;
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    label: Schema.Attribute.String;
    maxLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5000;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5000>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
  };
}

export interface FormElementsTileGroup extends Struct.ComponentSchema {
  collectionName: 'components_basic_tile_group';
  info: {
    description: '';
    displayName: 'Tiles';
  };
  attributes: {
    altLabel: Schema.Attribute.String;
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'form-helper.tile', true>;
    useTwoColumns: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface FormElementsTimeInput extends Struct.ComponentSchema {
  collectionName: 'components_form_elements_time_inputs';
  info: {
    description: '';
    displayName: 'TimeInput';
  };
  attributes: {
    errors: Schema.Attribute.Relation<'oneToMany', 'api::error.error'>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
  };
}

export interface FormHelperErrors extends Struct.ComponentSchema {
  collectionName: 'components_basic_errors';
  info: {
    description: '';
    displayName: 'Errors';
  };
  attributes: {
    code: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface FormHelperSelectOption extends Struct.ComponentSchema {
  collectionName: 'components_basic_select_options';
  info: {
    description: '';
    displayName: 'SelectOption';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormHelperTile extends Struct.ComponentSchema {
  collectionName: 'components_basic_tile';
  info: {
    description: '';
    displayName: 'Tile';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    tagDescription: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MetaBackground extends Struct.ComponentSchema {
  collectionName: 'components_meta_backgrounds';
  info: {
    description: '';
    displayName: 'Outer Background';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['default', 'white', 'blue', 'darkBlue', 'yellow']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
    paddingBottom: Schema.Attribute.Enumeration<
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
        'px64',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
    paddingTop: Schema.Attribute.Enumeration<
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
        'px64',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface MetaContainer extends Struct.ComponentSchema {
  collectionName: 'components_meta_containers';
  info: {
    description: '';
    displayName: 'Container';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['default', 'white', 'blue', 'yellow']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
    paddingBottom: Schema.Attribute.Enumeration<
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
        'px64',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
    paddingTop: Schema.Attribute.Enumeration<
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
        'px64',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface PageArraySummary extends Struct.ComponentSchema {
  collectionName: 'components_page_array_summaries';
  info: {
    description: '';
    displayName: 'ArraySummary';
    icon: 'bulletList';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    categoryUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageBox extends Struct.ComponentSchema {
  collectionName: 'components_page_boxes';
  info: {
    description: '';
    displayName: 'Box';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'form-elements.button', true>;
    container: Schema.Attribute.Component<'meta.container', false> &
      Schema.Attribute.Required;
    content: Schema.Attribute.Component<'basic.paragraph', false>;
    heading: Schema.Attribute.Component<'basic.heading', false>;
    identifier: Schema.Attribute.String;
    label: Schema.Attribute.Component<'basic.heading', false>;
    outerBackground: Schema.Attribute.Component<'meta.background', false>;
  };
}

export interface PageBoxWithImage extends Struct.ComponentSchema {
  collectionName: 'components_page_box_with_images';
  info: {
    description: '';
    displayName: 'BoxWithImage';
  };
  attributes: {
    container: Schema.Attribute.Component<'meta.container', false> &
      Schema.Attribute.Required;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.Component<'basic.heading', false>;
    identifier: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    outerBackground: Schema.Attribute.Component<'meta.background', false>;
    variant: Schema.Attribute.Enumeration<['ImgMTextL']>;
  };
}

export interface PageDetailsSummary extends Struct.ComponentSchema {
  collectionName: 'components_page_details_summary';
  info: {
    description: '';
    displayName: 'DetailsSummary';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageHeader extends Struct.ComponentSchema {
  collectionName: 'components_page_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    container: Schema.Attribute.Component<'meta.container', false> &
      Schema.Attribute.Required;
    content: Schema.Attribute.Component<'basic.paragraph', false>;
    heading: Schema.Attribute.Component<'basic.heading', false> &
      Schema.Attribute.Required;
    outerBackground: Schema.Attribute.Component<'meta.background', false>;
  };
}

export interface PageInfoBox extends Struct.ComponentSchema {
  collectionName: 'components_page_info_boxes';
  info: {
    description: '';
    displayName: 'InfoBox';
  };
  attributes: {
    container: Schema.Attribute.Component<'meta.container', false> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.Component<'basic.heading', false>;
    identifier: Schema.Attribute.String;
    items: Schema.Attribute.Component<'page.info-box-item', true>;
    outerBackground: Schema.Attribute.Component<'meta.background', false>;
    separator: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface PageInfoBoxItem extends Struct.ComponentSchema {
  collectionName: 'components_page_info_box_items';
  info: {
    description: '';
    displayName: 'InfoBoxItem';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'form-elements.button', true>;
    content: Schema.Attribute.RichText;
    detailsSummary: Schema.Attribute.Component<'page.details-summary', true>;
    headline: Schema.Attribute.Component<'basic.heading', false>;
    identifier: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.Component<'basic.heading', false>;
  };
}

export interface PageInlineNotice extends Struct.ComponentSchema {
  collectionName: 'components_page_inline_notice';
  info: {
    description: 'A notice component with a fixed title label-01-bold. The component works in FormFlow Page, Vorabcheck Page, and Content Page';
    displayName: 'InlineNotice';
  };
  attributes: {
    container: Schema.Attribute.Component<'meta.container', false> &
      Schema.Attribute.Required;
    content: Schema.Attribute.RichText;
    identifier: Schema.Attribute.String;
    look: Schema.Attribute.Enumeration<['warning', 'tips']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'warning'>;
    outerBackground: Schema.Attribute.Component<'meta.background', false>;
    tagName: Schema.Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'h1'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageLinkListBox extends Struct.ComponentSchema {
  collectionName: 'components_page_link_list_boxes';
  info: {
    description: '';
    displayName: 'LinkListBox';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'form-elements.button', true>;
    container: Schema.Attribute.Component<'meta.container', false> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.Component<'basic.heading', false>;
    identifier: Schema.Attribute.String;
    label: Schema.Attribute.Component<'basic.heading', false>;
    links: Schema.Attribute.Component<'basic.link', true>;
    outerBackground: Schema.Attribute.Component<'meta.background', false>;
  };
}

export interface PageList extends Struct.ComponentSchema {
  collectionName: 'components_page_lists';
  info: {
    description: '';
    displayName: 'List';
  };
  attributes: {
    container: Schema.Attribute.Component<'meta.container', false> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.Component<'basic.heading', false>;
    identifier: Schema.Attribute.String;
    isNumeric: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.Component<'page.list-item', true>;
    outerBackground: Schema.Attribute.Component<'meta.background', false>;
    subheading: Schema.Attribute.RichText;
  };
}

export interface PageListItem extends Struct.ComponentSchema {
  collectionName: 'components_page_list_items';
  info: {
    description: '';
    displayName: 'ListItem';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'form-elements.button', true>;
    content: Schema.Attribute.RichText;
    headline: Schema.Attribute.Component<'basic.heading', false>;
    identifier: Schema.Attribute.String;
  };
}

export interface PageMetaPageInfo extends Struct.ComponentSchema {
  collectionName: 'components_page_meta_page_infos';
  info: {
    description: '';
    displayName: 'MetaPageInfo';
  };
  attributes: {
    breadcrumb: Schema.Attribute.Text & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    ogTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageNavigationItem extends Struct.ComponentSchema {
  collectionName: 'components_page_navigation_items';
  info: {
    description: '';
    displayName: 'Navigation Item';
  };
  attributes: {
    baseurl: Schema.Attribute.String;
    targeturl: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageUserFeedback extends Struct.ComponentSchema {
  collectionName: 'components_page_user_feedbacks';
  info: {
    displayName: 'UserFeedback';
  };
  attributes: {
    headingRating: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageVideo extends Struct.ComponentSchema {
  collectionName: 'components_page_videos';
  info: {
    description: '';
    displayName: 'Video';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
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
