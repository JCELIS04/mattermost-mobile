// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useRef} from 'react';
import {type TextInputProps} from 'react-native';

import {type FloatingTextInputRef} from '@components/floating_text_input_label';

import Field from './field';

export type FieldProps = TextInputProps & {
    isDisabled?: boolean;
    fieldKey: string;
    label: string;
    maxLength?: number;
    onTextChange: (fieldKey: string, value: string) => void;
    isOptional?: boolean;
    testID: string;
    error?: string;
    value: string;
    onFocusNextField: (fieldKey: string) => void;
};

const CustomProfileField = ({
    autoCapitalize = 'none',
    autoCorrect = false,
    fieldKey,
    isDisabled = false,
    isOptional = false,
    keyboardType = 'default',
    label,
    maxLength,
    onTextChange,
    testID,
    value,
    error,
    onFocusNextField,
    ...props
}: FieldProps) => {
    const ref = useRef<FloatingTextInputRef>(null);
    return (
        <Field
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            fieldKey={fieldKey}
            isDisabled={isDisabled}
            isOptional={isOptional}
            keyboardType={keyboardType}
            label={label}
            maxLength={maxLength}
            onTextChange={onTextChange}
            testID={testID}
            value={value}
            fieldRef={ref}
            error={error}
            onFocusNextField={onFocusNextField}
            {...props}
        />);
};

export default CustomProfileField;
