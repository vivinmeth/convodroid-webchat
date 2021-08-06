import BotAvatar from '../../assets/images/bot-avatar.png';

const styleOptions= {
    accent: undefined, /** Web Chat component accent color */
    backgroundColor: '#ffffff', /** * Transcript background color **/
    subtle: undefined, /** Secondary component color **/
    paddingRegular: undefined, /** Default padding used in most visual components **/
    transitionDuration: undefined, /** Transition for Bubble, Carousel, and StackedLayout **/
    paddingWide: undefined, /** Padding used for suggestedAction buttons **/
    fontSizeSmall: '70%', /** Font size used for secondary components such as sendStatus **/
    monospaceFont: undefined, /** Font used for ErrorBox **/
    primaryFont: undefined, /** Font used in most visual components **/
    rootHeight: undefined, /** rootHeight of the webchat component **/
    rootWidth: '100%', /** rootWidth of the webchat component **/
    rootZIndex: undefined, /** "z-index" for the root container of Web Chat. This will form a new stacking context so "z-index" used in children won't pollute. **/
    /**
     * Avatar styling
     */
    avatarBorderRadius: undefined, /** Border radius used for both bot and user avatar **/
    avatarSize: undefined, /** Height and width of avatar **/
    botAvatarBackgroundColor: undefined, /** Background color defaults to accent **/
    botAvatarImage: BotAvatar, /** URL string. Can be data URI or blob * botAvatarInitials must be set to empty string **/
    botAvatarInitials: '', /** Typically rendered as two letters, e.g. 'WC' * Empty string is required when setting botAvatarImage **/
    userAvatarBackgroundColor: undefined, /** Background color defaults to accent **/
    userAvatarImage: undefined, /** URL string. Can be data URI or blob * userAvatarInitials must be set to empty string **/
    userAvatarInitials: undefined, /** Typically rendered as two letters, i.e. 'WC' * Empty string is required when setting userAvatarImage **/
    showAvatarInGroup: undefined, /**
     * Avatar grouping can be set at 3 different levels:
     * Show avatar on activities sharing the same sender ('sender')
     * Show avatar on activities sharing the same status ('status'; default)
     * Show avatar on every activity (true)
     **/

    /**
     *  Bubble styling
     * 'Bubble' refers to the container of the activit(ies) from the bot and user. Below, non-'fromUser' props refer to styling for the bot activities.
     */
    bubbleBackground: '#eaeaea',
    bubbleBorderColor: undefined,
    bubbleBorderRadius: 8,
    bubbleBorderStyle: undefined,
    bubbleBorderWidth: undefined,
    bubbleFromUserBackground: '#cbe8f7',
    bubbleFromUserBorderColor: undefined,
    bubbleFromUserBorderRadius: 8,
    bubbleFromUserBorderStyle: undefined,
    bubbleFromUserBorderWidth: undefined,

    bubbleFromUserNubOffset: undefined, /**
     * Nub offset 'bottom' will render nub at the bottom
     * A positive or negative number will shift nub offset up/down
     * "top" is equivalent to positive zero.
     * "bottom" is equivalent to negative zero.
     */
    bubbleFromUserNubSize: 0, /** Nub size 0 will render a sharp corner **/


    bubbleFromUserTextColor: '#212529',
    bubbleImageHeight: undefined,
    bubbleMaxWidth: undefined,
    bubbleMinHeight: undefined,
    bubbleMinWidth: undefined,

    bubbleNubOffset: undefined,/**
     * Nub offset ''bottom' will render nub at the bottom
     * A positive or negative number will shift nub offset up/down
     * "top" is equivalent to positive zero.
     * "bottom" is equivalent to negative zero.
     */
    bubbleNubSize: undefined, /** Nub size 0 will render a sharp corner **/

    bubbleTextColor: '#212529',

    messageActivityWordBreak: undefined,


    /**
     * Connectivity UI styling
     */

    connectivityIconPadding: undefined,
    connectivityMarginLeftRight: undefined,
    connectivityMarginTopBottom: undefined,
    connectivityTextSize: undefined,
    failedConnectivity: undefined,
    slowConnectivity: undefined,
    notificationText: undefined,

    /**
     * Slow connection status will render after x amount of time with no service response
     */
    slowConnectionAfter: undefined,

    /**
     * Emoji styling
     * If true, Web Chat's default set of emoji will be enabled. See patchStyleOptions.js for default list.
     * A custom object will enable unicode emoji specified by the developer.
     * key: emoticon
     * value: unicode emoji
     */
    emojiSet: undefined,

    /**
     * Live region - Accessibility
     * New activities will be rendered in the non-visual live region and removed after a certain amount of time. Modify this property to change fade time.
     */
    internalLiveRegionFadeAfter: undefined,

    /**
     * Markdown styling
     * Parse markdown to ensure carriage return is respected
     */
    markdownRespectCRLF: undefined,

    /**
     * Assign new image for anchor links to indicate external
     */

    markdownExternalLinkIconImage: undefined,
    /**
     * Scroll behavior styling
     */

    /**
     * Prevent scroll to end button from rendering
     *
     * @deprecated Since 4.14.0: To hide the scroll to end button, please set `scrollToEndButtonBehavior` to `false`.
     */
    // TODO: [P4] Will be removed on or after 2023-06-02.
    hideScrollToEndButton: undefined,

    /**
     * Snap to activity to 'snap-point'
     * If true, scrolling will pause after 1 activity is received.
     * Specifying a number will pause after X number of activities
     */
    autoScrollSnapOnActivity: undefined,

    /**
     * Specify number of pixels to overscroll or underscroll after pause
     */
    autoScrollSnapOnActivityOffset: undefined,

    /**
     * If true, scrolling will pause after activities have filled the page.
     * Specifying a number (0 to 1) will pause after % of page is filled
     */
    autoScrollSnapOnPage: true,

    /**
     * Specify number of pixels to overscroll or underscroll after pause
     */
    autoScrollSnapOnPageoffset: -300,

    /**
     * Send box styling
     */

    hideSendBox: undefined,
    hideUploadButton: undefined,
    microphoneButtonColorOnDictate: undefined,
    sendBoxBackground: '#fff',

    /**
     * Button color defaults to subtle
     */
    sendBoxButtonColor: undefined,

    sendBoxButtonColorOnDisabled: undefined,
    sendBoxButtonColorOnFocus: undefined,
    sendBoxButtonColorOnHover: undefined,

    /**
     * Disabled text color defaults to subtle
     */
    sendBoxDisabledTextColor: undefined,

    sendBoxHeight: undefined,
    sendBoxMaxHeight: undefined,
    sendBoxTextColor: '#555555',
    sendBoxBorderBottom: undefined,
    sendBoxBorderLeft: undefined,
    sendBoxBorderRight: undefined,
    sendBoxBorderTop: undefined,
    sendBoxPlaceholderColor: undefined,
    sendBoxTextWrap: undefined,
    sendBoxButtonAlignment: undefined,

    /**
     * Show spoken text
     */
    showSpokenText: undefined,

    /**
     * Spinner animation styling
     */

    spinnerAnimationBackgroundImage: undefined,
    spinnerAnimationHeight: undefined,
    spinnerAnimationWidth: undefined,
    spinnerAnimationPadding: undefined,

    /**
     * Suggested Actions
     */

    suggestedActionBackground: undefined,

    /**
     * Border color defaults to accent.
     */
    suggestedActionBorderColor: undefined,

    suggestedActionBorderRadius: undefined,
    suggestedActionBorderStyle: undefined,
    suggestedActionBorderWidth: undefined,

    /**
     * Disabled background defaults to suggestedActionBackground
     */
    suggestedActionDisabledBackground: undefined,

    suggestedActionDisabledBorderColor: undefined,
    suggestedActionDisabledBorderStyle: undefined,
    suggestedActionDisabledBorderWidth: undefined,

    /**
     * Disabled text color defaults to subtle
     */
    suggestedActionDisabledTextColor: undefined,

    suggestedActionHeight: undefined,
    suggestedActionImageHeight: undefined,
    suggestedActionLayout: undefined,
    suggestedActionTextColor: undefined,

    /**
     * Suggested actions carousel layout
     */

    /**
     * Cursor when mouseover on flipper
     */
    suggestedActionsCarouselFlipperCursor: undefined,

    /**
     * Flipper bounding box size
     */
    suggestedActionsCarouselFlipperBoxWidth: undefined,

    /**
     * Flipper button's visible size
     */
    suggestedActionsCarouselFlipperSize: undefined,

    /**
     * Suggested actions flow layout
     * Default value is 'auto',
     */
    suggestedActionsFlowMaxHeight: undefined,

    /**
     * Suggested actions stacked layout
     */

    /**
     * Stacked height container's max height. Default value is 'auto'
     */
    suggestedActionsStackedHeight: undefined,

    /**
     * Stacked overflow default value is 'auto
     */
    suggestedActionsStackedOverflow: undefined,

    /**
     * Button max height default value is 100% if suggestedActionsStackedLayoutButtonTextWrap is true
     */
    suggestedActionsStackedLayoutButtonMaxHeight: undefined,

    /**
     * Button Text Wrap, if set to true, will wrap long text in buttons in STACKED mode ONLY
     */
    suggestedActionsStackedLayoutButtonTextWrap: false,

    /**
     * Timestamp
     */

    /**
     * Specifies the time window for grouping related timestamps.
     *
     * `number` - time window for grouping related timestamps (in milliseconds)
     * `false` - never group timestamps
     * `true` - group all timestamps
     */
    groupTimestamp: undefined,

    sendTimeout: undefined,
    sendTimeoutForAttachments: undefined,

    /**
     * Timestamp color default value is subtle
     */
    timestampColor: undefined,

    timestampFormat: 'absolute',

    /**
     * Transcript styling
     */

    transcriptTerminatorBackgroundColor: undefined,
    transcriptTerminatorBorderRadius: undefined,
    transcriptTerminatorColor: undefined,
    transcriptTerminatorFontSize: undefined,

    transcriptActivityVisualKeyboardIndicatorColor: undefined,
    transcriptActivityVisualKeyboardIndicatorStyle: undefined,
    transcriptActivityVisualKeyboardIndicatorWidth: undefined,

    transcriptVisualKeyboardIndicatorColor: undefined,
    transcriptVisualKeyboardIndicatorStyle: undefined,
    transcriptVisualKeyboardIndicatorWidth: undefined,

    /**
     * Transcript overlay button
     * e.g. carousel and suggested action flippers, scroll to bottom, etc.
     */

    /**
     * Controls when the new messages button should show.
     *
     * - `"unread"` will show when there are any unread and offscreen messages (default)
     * - `"any"` will show when there are any offscreen messages
     * - `false` will always hide the button
     */
    scrollToEndButtonBehavior: undefined,

    /** Font size of the new message button. */
    scrollToEndButtonFontSize: undefined,

    /**
     * Font size of the new message button.
     *
     * @deprecated Since 4.14.0: Renamed to {@linkcode scrollToEndButtonFontSize}.
     */
    // TODO: [P4] Will be removed on or after 2023-06-02.
    newMessagesButtonFontSize: undefined,

    transcriptOverlayButtonBackground: undefined,
    transcriptOverlayButtonBackgroundOnDisabled: undefined,
    transcriptOverlayButtonBackgroundOnFocus: undefined,
    transcriptOverlayButtonBackgroundOnHover: undefined,
    transcriptOverlayButtonColor: undefined,
    transcriptOverlayButtonColorOnDisabled: undefined,

    /**
     * Default value is transcriptOverlayButtonColor
     */
    transcriptOverlayButtonColorOnFocus: undefined,

    /**
     * Default value is transcriptOverlayButtonColor
     */
    transcriptOverlayButtonColorOnHover: undefined,

    /**
     * Toast UI
     */

    /**
     * New debounce timeout value only affects new notifications.
     */
    notificationDebounceTimeout: undefined,

    hideToaster: undefined,
    toasterHeight: undefined,
    toasterMaxHeight: undefined,
    toasterSingularMaxHeight: undefined,
    toastFontSize: undefined,
    toastIconWidth: undefined,
    toastSeparatorColor: undefined,
    toastTextPadding: undefined,

    toastErrorBackgroundColor: undefined,
    toastErrorColor: undefined,
    toastInfoBackgroundColor: undefined,
    toastInfoColor: undefined,
    toastSuccessBackgroundColor: undefined,
    toastSuccessColor: undefined,
    toastWarnBackgroundColor: undefined,
    toastWarnColor: undefined,

    /**
     * Typing animation
     */

    typingAnimationBackgroundImage: undefined,
    typingAnimationDuration: undefined,
    typingAnimationHeight: undefined,
    typingAnimationWidth: undefined,

    /**
     * Upload thumbnail
     */

    enableUploadThumbnail: undefined,
    uploadThumbnailContentType: undefined,
    uploadThumbnailHeight: undefined,
    uploadThumbnailQuality: undefined,
    uploadThumbnailWidth: undefined,

    /**
     * Video
     */

    videoHeight: undefined,

    /** Adaptive Cards: Specify the maximum schema version supported by the Adaptive Card serializer. */
    adaptiveCardsParserMaxVersion: undefined,

    /**
     * Adaptive Cards styling for 'emphasis' container style
     */
    cardEmphasisBackgroundColor: '#fafafa',

    /**
     * Adaptive Cards: background color of Adaptive Cards button with status of 'aria-pressed'
     */
    cardPushButtonBackgroundColor: undefined,

    /**
     * Adaptive Cards: text color of Adaptive Cards button with status of 'aria-pressed'
     */
    cardPushButtonTextColor: undefined,

    /**
     * Cards: Rich Cards
     * Enable title (and subtitle) wrapping
     */
    richCardWrapTitle: undefined
};

// @ts-ignore
Object.keys(styleOptions).forEach(key => styleOptions[key] === undefined ? delete styleOptions[key] : {});


export default styleOptions;
