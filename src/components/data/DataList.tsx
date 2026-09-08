/**
 * Generic list wrapper over FlashList with built-in loading / empty / error
 * states. Every list screen in the app must use this rather than a bare
 * FlashList so those three states are never skipped.
 */
import React from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { SkeletonRow } from "./SkeletonRow";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { useTheme } from "../../theme/ThemeContext";
import type { Ionicons } from "@expo/vector-icons";

interface DataListProps<T> {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement;
  keyExtractor: (item: T) => string;
  estimatedItemSize: number;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  emptyIcon: keyof typeof Ionicons.glyphMap;
  emptyMessage: string;
  onRefresh?: () => void;
  refreshing?: boolean;
}

/** A FlashList wrapper that renders loading/empty/error states consistently. */
export function DataList<T>({
  data,
  renderItem,
  keyExtractor,
  estimatedItemSize,
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  emptyIcon,
  emptyMessage,
  onRefresh,
  refreshing = false,
}: DataListProps<T>) {
  const { colors, space } = useTheme();

  if (isLoading) {
    return (
      <>
        {[0, 1, 2, 3, 4].map((i) => (
          <SkeletonRow key={i} height={estimatedItemSize} />
        ))}
      </>
    );
  }

  if (isError) {
    return <ErrorState message={errorMessage} onRetry={onRetry ?? (() => {})} />;
  }

  if (data.length === 0) {
    return <EmptyState icon={emptyIcon} message={emptyMessage} />;
  }

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={estimatedItemSize}
      contentContainerStyle={{ padding: space.lg, backgroundColor: colors.oat }}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.leaf}
          />
        ) : undefined
      }
    />
  );
}
