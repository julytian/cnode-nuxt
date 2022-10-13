import { IAddReplyParams, IUpdateTopicParams } from '~~/interfaces';

/**
 * 获取文章详情
 * @param id 文章id
 * @param mdrender 是否markdown渲染
 * @param accesstoken 登录token
 * @returns
 */
export function useGetTopic(id: string, mdrender = true, accesstoken = '') {
  let url = `/topic/${id}?mdrender=${mdrender}`;
  if (accesstoken) {
    url += `&accesstoken=${accesstoken}`;
  }
  return useHttp('getTopic', url);
}

/**
 * 评论点赞
 * @param id 主题id
 * @param accesstoken 登录token
 * @returns
 */
export function useSetReplyUps(id: string, accesstoken: string) {
  return useHttp('setReplyUps', `/reply/${id}/ups`, {
    method: 'POST',
    body: {
      accesstoken,
    },
  });
}
/**
 * 添加评论
 * @param body
 * {
 *   accesstoken: '',
 *   content: '',
 *   reply_id: '',
 *   topic_id: ''
 * }
 * @returns
 */
export function useAddReply(body: IAddReplyParams) {
  return useHttp('addReply', `/topic/${body.topic_id}/replies`, {
    method: 'POST',
    body,
  });
}

/**
 * 处理主题收藏
 * @param accesstoken 
 * @param topic_id 
 * @param isAdd 收藏还是取消收藏 
 * @returns 
 */
export function useToggleCollect(accesstoken: string, topic_id: string, isAdd = true) {
  return useHttp('addCollect', isAdd?'/topic_collect/collect':'/topic_collect/de_collect', {
    method: 'POST',
    body: {
      accesstoken,
      topic_id,
    },
  });
}

/**
 * 编辑主题
 * @param body 
 * @param isUpdate 是否是编辑主题
 * @returns 
 */
export function useUpdateTopic(body:IUpdateTopicParams, isUpdate = false) {
  return useHttp('updateTopic', isUpdate?'/topics/update':'/topics',{
    method: 'POST',
    body
  })
}