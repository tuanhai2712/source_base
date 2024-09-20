export enum InitPagination {
  DEFAULT_PAGE = 1,
  DEFAULT_PAGE_SIZE = 10,
  DEFAULT_PAGE_SIZE_SMALL = 10,
  DEFAULT_PAGE_SIZE_MINI = 5,
}
export const OptionPagination = [20, 50, 100];
export const OptionPaginationSmall = [10, 20, 50];
export const OptionPaginationNotification = [10, 20, 50];
export enum InitPaginationNotification {
  DEFAULT_PAGE = 1,
  DEFAULT_PAGE_SIZE = OptionPaginationNotification[0],
}
