import { HTMLAttributes } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    isDisabled?: boolean;
    kind?: 'primary' | 'secondary' | 'round' | 'linklike';
    type?: 'submit' | 'reset' | 'button';
}
