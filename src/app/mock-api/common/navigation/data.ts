/* eslint-disable */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'departments',
        title: 'Departments',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/departments'
    },
    {
        id: 'teachers',
        title: 'Teachers',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/teachers'
    },
    {
        id: 'courses',
        title: 'Course Management',
        type: 'collapsable',
        icon: 'heroicons_outline:book-open',
        children: [
            {
                id: 'coursesList',
                title: 'Course List',
                type: 'basic',
                icon: 'heroicons_outline:book-open',
                link: '/courses',
            },
            {
                id: 'courseTeachers',
                title: 'Course Teachers',
                type: 'basic',
                icon: 'heroicons_outline:square-3-stack-3d',
                link: '/teacherCourses'
            }
        ]
    },
    {
        id: 'rooms',
        title: 'Rooms',
        type: 'basic',
        icon: 'heroicons_outline:building-storefront',
        link: '/rooms'
    },
    {
        id: 'syllabus',
        title: 'Syllabus',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        link: '/syllabus'
    },
    {
        id: 'preferences',
        title: 'Preferences',
        type: 'basic',
        icon: 'heroicons_outline:adjustments-horizontal',
        link: '/preferences'
    },
    {
        id: 'routiineManagement',
        title: 'Routine Management',
        type: 'collapsable',
        icon: 'heroicons_outline:book-open',
        children: [
            {
                id: 'classRoutines',
                title: 'Class Routines',
                type: 'basic',
                icon: 'heroicons_outline:book-open',
                link: '/routine/class/list',
            },
            {
                id: 'examRoutines',
                title: 'Exam Routines',
                type: 'basic',
                icon: 'heroicons_outline:square-3-stack-3d',
                link: '/routine/form',
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'organizations',
        title: 'Organizations',
        type: 'basic',
        icon: 'heroicons_outline:building-office-2',
        link: '/organizations'
    },
    {
        id: 'departments',
        title: 'Departments',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/departments'
    },
    {
        id: 'teachers',
        title: 'Teachers',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/teachers'
    },
    {
        id: 'rooms',
        title: 'Rooms',
        type: 'basic',
        icon: 'heroicons_outline:building-storefront',
        link: '/rooms'
    },
    {
        id: 'courses',
        title: 'Courses',
        type: 'basic',
        icon: 'heroicons_outline:book-open',
        link: '/courses'
    },
    {
        id: 'teacherCourses',
        title: 'Teacher Courses',
        type: 'basic',
        icon: 'heroicons_outline:square-3-stack-3d',
        link: '/teacherCourses'
    },
    {
        id: 'preferences',
        title: 'Preferences',
        type: 'basic',
        icon: 'heroicons_outline:adjustments-horizontal',
        link: '/preferences'
    },
    {
        id: 'routine',
        title: 'Routine',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-list',
        link: '/routine'
    },
    {
        id: 'syllabus',
        title: 'Syllabus',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        link: '/syllabus'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'organizations',
        title: 'Organizations',
        type: 'basic',
        icon: 'heroicons_outline:building-office-2',
        link: '/organizations'
    },
    {
        id: 'departments',
        title: 'Departments',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/departments'
    },
    {
        id: 'teachers',
        title: 'Teachers',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/teachers'
    },
    {
        id: 'rooms',
        title: 'Rooms',
        type: 'basic',
        icon: 'heroicons_outline:building-storefront',
        link: '/rooms'
    },
    {
        id: 'courses',
        title: 'Courses',
        type: 'basic',
        icon: 'heroicons_outline:book-open',
        link: '/courses'
    },
    {
        id: 'teacherCourses',
        title: 'Teacher Courses',
        type: 'basic',
        icon: 'heroicons_outline:square-3-stack-3d',
        link: '/teacherCourses'
    },
    {
        id: 'preferences',
        title: 'Preferences',
        type: 'basic',
        icon: 'heroicons_outline:adjustments-horizontal',
        link: '/preferences'
    },
    {
        id: 'routine',
        title: 'Routine',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-list',
        link: '/routine'
    },
    {
        id: 'syllabus',
        title: 'Syllabus',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        link: '/syllabus'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'organizations',
        title: 'Organizations',
        type: 'basic',
        icon: 'heroicons_outline:building-office-2',
        link: '/organizations'
    },
    {
        id: 'departments',
        title: 'Departments',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/departments'
    },
    {
        id: 'teachers',
        title: 'Teachers',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/teachers'
    },
    {
        id: 'rooms',
        title: 'Rooms',
        type: 'basic',
        icon: 'heroicons_outline:building-storefront',
        link: '/rooms'
    },
    {
        id: 'courses',
        title: 'Courses',
        type: 'basic',
        icon: 'heroicons_outline:book-open',
        link: '/courses'
    },
    {
        id: 'teacherCourses',
        title: 'Teacher Courses',
        type: 'basic',
        icon: 'heroicons_outline:square-3-stack-3d',
        link: '/teacherCourses'
    },
    {
        id: 'preferences',
        title: 'Preferences',
        type: 'basic',
        icon: 'heroicons_outline:adjustments-horizontal',
        link: '/preferences'
    },
    {
        id: 'routine',
        title: 'Routine',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-list',
        link: '/routine'
    },
    {
        id: 'syllabus',
        title: 'Syllabus',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        link: '/syllabus'
    }
];
