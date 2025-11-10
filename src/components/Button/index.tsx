import { 
    Text, 
    TouchableOpacity, 
    TouchableOpacityProps,
    ActivityIndicator
} from 'react-native'

import { styles } from './styles';
import { colors } from '@/theme'

type Props = TouchableOpacityProps & {
    title: string;
    isLoading?: boolean;
}

export function Button ({title, isLoading, ...rest} :Props) {
    return (
        <TouchableOpacity 
            style={styles.container} 
            activeOpacity={0.8}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? (
                <ActivityIndicator color={colors.white} size="small"/>
            ) : ( 
                <Text style={styles.title}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}
