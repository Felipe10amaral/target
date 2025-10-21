import {
    FlatList,
    FlatListProps,
    Text,
    StyleProp,
    View,
    ViewStyle
} from 'react-native';

import { styles } from './styles';
import {colors} from '@/theme'
import Separator from '../Separator';

type Props<T> = FlatListProps<T> & {
    title: string;
    containerStyle?: StyleProp<ViewStyle>;
    emptyMessage?: string;
};

export function List<T>({ containerStyle, title, emptyMessage, data, renderItem, ...rest }: Props<T>) {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.title}> {title} </Text>

            <FlatList 
                data={data}
                renderItem={renderItem}
                {...rest}
                ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.empty}> {emptyMessage || 'Nenhum item encontrado.'} </Text>
                )}
            />
        </View>
    )
}