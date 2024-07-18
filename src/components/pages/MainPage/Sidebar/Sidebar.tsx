import { useNoteList } from '@/hooks';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';

import SidebarSection from './SidebarSection/SidebarSection';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import SidebarSectionLink from './SidebarSectionLink/SidebarSectionLink';
import SidebarSectionButton from './SidebarSectionButton/SidebarSectionButton';

export default function Sidebar() {
	const { noteList } = useNoteList();

	return (
		<div className='h-full flex flex-col'>
			<SidebarHeader />

			<div className='flex-shrink-0'>
				<SidebarSection
					label='基本機能'
					icon={<CircleIcon />}
				>
					<SidebarSectionLink
						to='/'
						label='新規作成'
						icon={<AddCircleIcon />}
					/>
					<SidebarSectionButton
						onClick={() => {
							console.log('search');
						}}
						label='検索'
						icon={<SearchIcon />}
					/>
					<SidebarSectionLink
						to='/account'
						label='アカウント'
						icon={<AccountCircleIcon />}
					/>
					<SidebarSectionLink
						to='/settings'
						label='設定'
						icon={<SettingsIcon />}
					/>
				</SidebarSection>
			</div>

			<SidebarSection
				label='ノート一覧'
				icon={<TextSnippetIcon />}
			>
				{noteList?.map((note) => (
					<SidebarSectionLink
						key={note.id}
						to={`/${note.id}`}
						label={note.title}
						icon={<TextSnippetIcon />}
					/>
				))}
			</SidebarSection>
		</div>
	);
}
