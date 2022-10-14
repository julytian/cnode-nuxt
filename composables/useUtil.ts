/**
 * 获取不同tab的信息
 * @param  {[String]}  tab     [tab分类]
 * @param  {[Boolean]}  good    [是否是精华]
 * @param  {[Boolean]}  top     [是否置顶]
 * @param  {Boolean} isClass [是否是样式]
 * @return {[type]}          [返回对应字符串]
 */
export const useGetTabInfo = (
  tab: string,
  good: boolean,
  top: boolean,
  isClass: boolean
) => {
  let str = '';
  let className = '';
  if (top) {
    str = '置顶';
    className = 'top';
  } else if (good) {
    str = '精华';
    className = 'good';
  } else {
    switch (tab) {
      case 'share':
        str = '分享';
        className = 'share';
        break;
      case 'ask':
        str = '问答';
        className = 'ask';
        break;
      case 'job':
        str = '招聘';
        className = 'job';
        break;
      case 'dev':
        str = '测试';
        className = 'test';
        break;
      default:
        str = '暂无';
        className = 'default';
        break;
    }
  }
  return isClass ? className : str;
}
