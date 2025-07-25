import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const posStyles = StyleSheet.create({
  // General Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    height: 56,
    paddingHorizontal: 15,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
    marginRight: 8,
  },
  headerIcon: {
    marginLeft: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    padding: 8,
    marginLeft: 5,
  },
  
  // Ticket Actions Section
  ticketActions: {
    flexDirection: 'row',
    height: 70,
  },
  ticketActionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketActionButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  chargeContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chargeTitle: {
    color: COLORS.white,
    fontSize: 14,
  },
  chargeAmount: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Filter Section
  filterSection: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: COLORS.text,
    marginRight: 5,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
  
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyStateSubtitle: {
    color: COLORS.textLight,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 10,
  },
  emptyStateButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // Navigation
  navigationContainer: {
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  navigationText: {
    color: COLORS.text,
    marginLeft: 15,
    fontSize: 16,
  },
  navigationTextActive: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  
  // Menu Items (for settings, items screens)
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    color: COLORS.text,
    fontSize: 16,
  },
  
  // Action Buttons (for shift screen)
  actionButtons: {
    padding: 15,
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // Shift Info
  shiftInfo: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  shiftInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  shiftInfoLabel: {
    color: COLORS.text,
    fontSize: 15,
    flex: 1,
  },
  shiftInfoValue: {
    color: COLORS.text,
    fontSize: 15,
    textAlign: 'right',
  },
  shiftInfoDate: {
    color: COLORS.text,
    fontSize: 15,
    marginLeft: 10,
  },
  
  // Sections
  section: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  
  // Settings screen specific
  noteContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  noteText: {
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 10,
  },
  noteButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  noteButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 0,
    marginLeft: 5,
  },
  noteButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  noteButtonTextSecondary: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // Account info
  accountContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 20,
  },
  accountEmail: {
    color: COLORS.textLight,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: COLORS.textLight,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // Categories Screen
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    height: 56,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  formField: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  formLabel: {
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: 5,
  },
  formInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    color: COLORS.text,
    fontSize: 16,
    paddingVertical: 8,
  },
  
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  colorOption: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionSelected: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  
  // Drawer Navigation
  drawer: {
    flex: 1,
    backgroundColor: COLORS.card,
    width: 280,
  },
  drawerHeader: {
    backgroundColor: COLORS.primary,
    padding: 16,
    paddingTop: 48,
  },
  drawerHeaderTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  drawerHeaderSubtitle: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.8,
  },
  
  // Search Icon
  searchIconContainer: {
    position: 'absolute',
    top: 65,
    right: 15,
    zIndex: 10,
  },
  searchIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Floating Action Button
  floatingActionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  
  // Link Text
  linkText: {
    marginTop: 10,
  },
  linkTextContent: {
    color: COLORS.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  
  // Create Item Screen
  dropdownField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownText: {
    color: COLORS.text,
    fontSize: 16,
  },
  formHint: {
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 5,
  },
  radioGroup: {
    marginVertical: 10,
  },
  sectionHeader: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeaderText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  switchLabel: {
    color: COLORS.text,
    fontSize: 16,
  },
  shapeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  shapeOption: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    position: 'relative',
  },
  shapeOptionSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  shapeCheckmark: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  uploadImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  uploadImageText: {
    color: COLORS.primary,
    fontSize: 16,
    marginLeft: 10,
  },
});
