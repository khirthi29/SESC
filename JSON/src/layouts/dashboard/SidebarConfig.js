import profileIcon from '@iconify/icons-ic/person-outline';
function Profile(icon) {
  return <img src="/static/illustrations/user.png"  alt="Icon" width={20} height={20}  />;
}
function Statistical(icon) {
  return <img src="/static/illustrations/content-creator.png" className="imgiconss" alt="Icon" />;
}
function TestIcon(icon) { 
  return <img src="/static/illustrations/question.png" className="imgiconss" alt="Icon" />;
}
function ManageContent(icon) {
  return <img src="/static/illustrations/system.png" className="imgiconss" alt="Icon" />;
}
function Usermanagment(icon) {
  return <img src="/static/illustrations/team.png" className="imgiconss" alt="Icon"/>;
}


const sidebarConfig = [
  {
    title: 'Profile',
    path: '/dashboard/userprofile',
    icon: Profile(profileIcon),
    type: [1, 2, 3, 4],
    services: []
  },
  {
    title: 'Courses',
    path: '/dashboard/userlist',
    icon: Usermanagment(profileIcon),
    type: [1],
    services: []
  },
  {
    title: 'Books',
    path: '/dashboard/app',
    icon: Usermanagment(profileIcon),
    type: [1],
    services: []
  },
  {
    title: 'Transactions',
    path: '/dashboard/TestPage',
    icon: TestIcon(profileIcon),
    type: [1],
    services: []
  }
];

export default sidebarConfig;
