// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {Keyboard, TouchableHighlight, View} from 'react-native';

import ChannelInfo from '@components/channel_info';
import DraftPost from '@components/draft/draft_post';
import Header from '@components/post_draft/draft_input/header';
import {Screens} from '@constants';
import {useTheme} from '@context/theme';
import {useIsTablet} from '@hooks/device';
import {DRAFT_OPTIONS_BUTTON} from '@screens/draft_options';
import {openAsBottomSheet} from '@screens/navigation';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import type ChannelModel from '@typings/database/models/servers/channel';
import type DraftModel from '@typings/database/models/servers/draft';
import type UserModel from '@typings/database/models/servers/user';

type Props = {
    channel: ChannelModel;
    location: string;
    draftReceiverUser?: UserModel;
    draft: DraftModel;
    layoutWidth: number;
    isPostPriorityEnabled: boolean;
}

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => {
    return {
        container: {
            paddingHorizontal: 20,
            paddingVertical: 16,
            width: '100%',
            borderTopColor: changeOpacity(theme.centerChannelColor, 0.16),
            borderTopWidth: 1,
        },
        pressInContainer: {
            backgroundColor: changeOpacity(theme.centerChannelColor, 0.16),
        },
        postPriority: {
            marginTop: 10,
            marginLeft: -12,
        },
    };
});

const Draft: React.FC<Props> = ({
    channel,
    location,
    draft,
    draftReceiverUser,
    layoutWidth,
    isPostPriorityEnabled,
}) => {
    const intl = useIntl();
    const theme = useTheme();
    const style = getStyleSheet(theme);
    const isTablet = useIsTablet();
    const showPostPriority = Boolean(isPostPriorityEnabled && draft.metadata?.priority && draft.metadata?.priority?.priority);

    const onLongPress = useCallback(() => {
        Keyboard.dismiss();
        const title = isTablet ? intl.formatMessage({id: 'draft.options.title', defaultMessage: 'Draft Options'}) : 'Draft Options';
        openAsBottomSheet({
            closeButtonId: DRAFT_OPTIONS_BUTTON,
            screen: Screens.DRAFT_OPTIONS,
            theme,
            title,
            props: {channel, rootId: draft.rootId, draft, draftReceiverUserName: draftReceiverUser?.username},
        });
    }, [channel, draft, draftReceiverUser?.username, intl, isTablet, theme]);

    return (
        <TouchableHighlight
            delayLongPress={200}
            onLongPress={onLongPress}
            underlayColor={changeOpacity(theme.centerChannelColor, 0.1)}
        >
            <View
                style={style.container}
            >
                <ChannelInfo
                    channel={channel}
                    draftReceiverUser={draftReceiverUser}
                    rootId={draft.rootId}
                    testID='draft_post.channel_info'
                    updateAt={draft.updateAt}
                />
                {showPostPriority && draft.metadata?.priority &&
                <View style={style.postPriority}>
                    <Header
                        noMentionsError={false}
                        postPriority={draft.metadata?.priority}
                    />
                </View>
                }
                <DraftPost
                    draft={draft}
                    location={location}
                    layoutWidth={layoutWidth}
                />
            </View>

        </TouchableHighlight>
    );
};

export default Draft;
