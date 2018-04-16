
import empty from '@/pages/empty'
import uploadImg from '@/pages/demo/uploadImg'

export default [{
  path: '/demo',
  component: empty,
  children: [{
    path: 'uploadImg',
    component: uploadImg
  }]
}]
