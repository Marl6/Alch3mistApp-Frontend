import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../assets/styles/pos.styles';
import { COLORS } from '../../constants/colors';

/**
 * Reusable POS List Item Component
 */
export const PosListItem = ({ 
  item, 
  onPress, 
  onLongPress,
  leftIcon,
  leftColor,
  title,
  subtitle,
  rightContent,
  showChevron = true 
}) => {
  return (
    <TouchableOpacity 
      style={posStyles.menuItem}
      onPress={() => onPress?.(item)}
      onLongPress={() => onLongPress?.(item)}
    >
      {leftIcon && (
        <View style={[
          posStyles.listItemIcon,
          leftColor && { backgroundColor: leftColor }
        ]}>
          <Ionicons name={leftIcon} size={24} color={COLORS.white} />
        </View>
      )}
      {leftColor && !leftIcon && (
        <View style={[posStyles.colorIndicator, { backgroundColor: leftColor }]} />
      )}
      <View style={posStyles.listItemContent}>
        <Text style={posStyles.listItemTitle}>{title}</Text>
        {subtitle && <Text style={posStyles.listItemSubtitle}>{subtitle}</Text>}
      </View>
      {rightContent}
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
      )}
    </TouchableOpacity>
  );
};

/**
 * Reusable Empty State Component
 */
export const PosEmptyState = ({ 
  icon = "cube-outline", 
  title, 
  subtitle, 
  actionLabel,
  onAction,
  onLearnMore
}) => {
  return (
    <View style={posStyles.emptyState}>
      <Ionicons name={icon} size={100} color={COLORS.textLight} style={{opacity: 0.5}} />
      <Text style={posStyles.emptyStateTitle}>{title}</Text>
      <Text style={posStyles.emptyStateSubtitle}>{subtitle}</Text>
      
      {onLearnMore && (
        <TouchableOpacity 
          style={posStyles.linkText}
          onPress={onLearnMore}
        >
          <Text style={posStyles.linkTextContent}>Learn more</Text>
        </TouchableOpacity>
      )}
      
      {actionLabel && onAction && (
        <TouchableOpacity 
          style={posStyles.emptyStateButton}
          onPress={onAction}
        >
          <Text style={posStyles.emptyStateButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Reusable Loading State Component
 */
export const PosLoadingState = ({ message = "Loading..." }) => {
  return (
    <View style={posStyles.emptyState}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={[posStyles.emptyStateSubtitle, { marginTop: 15 }]}>{message}</Text>
    </View>
  );
};

/**
 * Reusable Error State Component
 */
export const PosErrorState = ({ 
  message = "Something went wrong", 
  onRetry 
}) => {
  return (
    <View style={posStyles.emptyState}>
      <Ionicons name="alert-circle-outline" size={80} color={COLORS.error || '#D32F2F'} />
      <Text style={posStyles.emptyStateTitle}>Error</Text>
      <Text style={posStyles.emptyStateSubtitle}>{message}</Text>
      {onRetry && (
        <TouchableOpacity 
          style={posStyles.emptyStateButton}
          onPress={onRetry}
        >
          <Text style={posStyles.emptyStateButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Reusable POS List Component with loading, error, and empty states
 */
export const PosList = ({
  data,
  loading,
  error,
  refreshing,
  onRefresh,
  onRetry,
  renderItem,
  keyExtractor,
  emptyIcon,
  emptyTitle,
  emptySubtitle,
  emptyActionLabel,
  onEmptyAction,
  ListHeaderComponent,
  contentContainerStyle
}) => {
  if (loading && !refreshing) {
    return <PosLoadingState />;
  }

  if (error) {
    return <PosErrorState message={error} onRetry={onRetry || onRefresh} />;
  }

  if (!data || data.length === 0) {
    return (
      <PosEmptyState
        icon={emptyIcon}
        title={emptyTitle || "No data yet"}
        subtitle={emptySubtitle || "Get started by creating one"}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor || ((item) => item.id?.toString())}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        ) : undefined
      }
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[
        { flexGrow: 1 },
        contentContainerStyle
      ]}
    />
  );
};

/**
 * Confirmation Modal Component
 */
export const ConfirmationModal = ({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  confirmColor = COLORS.primary,
  isDestructive = false
}) => {
  if (!visible) return null;

  return (
    <TouchableOpacity 
      style={posStyles.modalOverlay}
      activeOpacity={1}
      onPress={onCancel}
    >
      <View style={posStyles.modalContainer}>
        <Text style={posStyles.modalTitle}>{title}</Text>
        <Text style={posStyles.modalMessage}>{message}</Text>
        
        <View style={posStyles.modalButtons}>
          <TouchableOpacity 
            style={[posStyles.modalButton, posStyles.modalButtonSecondary]}
            onPress={onCancel}
          >
            <Text style={posStyles.modalButtonTextSecondary}>{cancelLabel}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              posStyles.modalButton, 
              posStyles.modalButtonPrimary,
              isDestructive && { backgroundColor: COLORS.error || '#D32F2F' }
            ]}
            onPress={onConfirm}
          >
            <Text style={posStyles.modalButtonTextPrimary}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default {
  PosListItem,
  PosEmptyState,
  PosLoadingState,
  PosErrorState,
  PosList,
  ConfirmationModal
};
