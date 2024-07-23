import { useNoteList, useTagList } from '@/hooks';

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
import MultipleSelector from '@/components/elements/MultipleSelector/MultipleSelector';

export default function Sidebar() {
	const { noteList, setFilterTags, filterTags } = useNoteList();
	const { tagList } = useTagList();

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
							const modal = document.querySelector('.modal') as HTMLDialogElement;
							modal.showModal();
						}}
						label='検索'
						icon={<SearchIcon />}
					/>

					<dialog className='modal'>
						<div className='modal-box flex flex-col gap-4'>
							<h3 className='font-bold text-lg'>検索</h3>
							<MultipleSelector
								options={tagList?.map((tag) => tag.name) || []}
								value={filterTags.map((tag) => tag.name)}
								placeholder={'タグを選択'}
								onChange={function (newValue: string[]): void {
									const updatedTags =
										tagList?.filter((tag) => newValue.includes(tag.name)) || [];
									setFilterTags(updatedTags);
								}}
								alwaysOpen={true}
								noElevation={true}
							/>
							<div className='modal-action'>
								<form method='dialog'>
									<button className='btn'>閉じる</button>
								</form>
							</div>
						</div>
					</dialog>

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
