import { Link, useNavigate } from 'react-router-dom';
import { useNoteList, useResponsive, useSplitView } from '@/hooks';
import DehazeIcon from '@mui/icons-material/Dehaze';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';

import { useState } from 'react';
import IconButton from '@/components/ui/IconButton/IconButton';

interface ListHeaderItem {
	icon: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

function SidebarHeader() {
	const { isMobile } = useResponsive();

	const { toggleSplitRatio } = useSplitView();

	const navigate = useNavigate();

	const headerItems: ListHeaderItem[] = [
		{
			icon: <AddCircleIcon />,
			onClick: () => {
				navigate('/');
			},
			disabled: false,
		},
		{
			icon: <SearchIcon />,
			onClick: () => {},
			disabled: false,
		},
	];

	return (
		<div className='flex items-center justify-between py-2 px-4 border-b-2'>
			<div className='text-lg font-semibold'>Jowift</div>
			<div className='flex items-center space-x-2'>
				{headerItems?.map((item: ListHeaderItem, index: number) => (
					<IconButton
						key={index}
						onClick={item.onClick}
						disabled={item.disabled}
						variant='ghost'
						size='small'
					>
						{item.icon}
					</IconButton>
				))}
				{isMobile && (
					<IconButton
						onClick={toggleSplitRatio}
						variant='ghost'
						size='small'
					>
						<DehazeIcon />
					</IconButton>
				)}
			</div>
		</div>
	);
}

type SidebarSectionProps = {
	label: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

function SidebarSection(props: SidebarSectionProps) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='overflow-y-hidden flex flex-col'>
			<div
				className='flex items-center justify-between cursor-pointer p-2'
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className='flex items-center gap-2 font-bold h-8 px-1 '>
					{props.icon}
					<span>{props.label}</span>
				</div>
				{isOpen ? (
					<ExpandLessIcon className='w-5 h-5 text-gray-600' />
				) : (
					<ExpandMoreIcon className='w-5 h-5 text-gray-600' />
				)}
			</div>
			{isOpen && (
				<div className='overflow-y-auto'>
					<ul className='menu gap-1'>{props.children}</ul>
				</div>
			)}
		</div>
	);
}

type SidebarSectionItemProps = {
	to: string;
	label: string;
	icon: React.ReactNode;
};

function SidebarSectionItem(props: SidebarSectionItemProps) {
	return (
		<li className='max-w-full'>
			<Link
				to={props.to}
				className='flex items-center gap-2 h-8 max-w-full'
			>
				{props.icon}
				<span className='truncate'>{props.label}</span>
			</Link>
		</li>
	);
}

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
					<SidebarSectionItem
						to='/'
						label='新規作成'
						icon={<AddCircleIcon />}
					/>
					<SidebarSectionItem
						to='/search'
						label='検索'
						icon={<SearchIcon />}
					/>
					<SidebarSectionItem
						to='/account'
						label='アカウント'
						icon={<AccountCircleIcon />}
					/>
					<SidebarSectionItem
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
					<SidebarSectionItem
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
