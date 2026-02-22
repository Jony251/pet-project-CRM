import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ResetPassword from './pages/auth/ResetPassword';

import DashboardPage from './pages/DashboardPage';
import Analytics from './pages/dashboard/Analytics';
import Fintech from './pages/dashboard/Fintech';

import Customers from './pages/ecommerce/Customers';
import Orders from './pages/ecommerce/Orders';
import Invoices from './pages/ecommerce/Invoices';
import Shop from './pages/ecommerce/Shop';

import UsersTabs from './pages/community/UsersTabs';
import UsersTiles from './pages/community/UsersTiles';
import Profile from './pages/community/Profile';
import Feed from './pages/community/Feed';
import Forum from './pages/community/Forum';
import Meetups from './pages/community/Meetups';

import FinanceCards from './pages/finance/Cards';
import Transactions from './pages/finance/Transactions';

import JobListing from './pages/jobs/JobListing';
import CompanyProfile from './pages/jobs/CompanyProfile';

import TasksKanban from './pages/tasks/TasksKanban';
import TasksList from './pages/tasks/TasksList';

import Messages from './pages/messages/Messages';
import CalendarPage from './pages/calendar/Calendar';
import Campaigns from './pages/campaigns/Campaigns';

import SettingsLayout from './pages/settings/SettingsLayout';
import Account from './pages/settings/Account';
import NotificationsSettings from './pages/settings/Notifications';
import Apps from './pages/settings/Apps';
import Plans from './pages/settings/Plans';
import Billing from './pages/settings/Billing';
import FeedbackPage from './pages/settings/Feedback';

import Changelog from './pages/utility/Changelog';
import Roadmap from './pages/utility/Roadmap';
import Faqs from './pages/utility/Faqs';
import EmptyStatePage from './pages/utility/EmptyStatePage';
import KnowledgeBase from './pages/utility/KnowledgeBase';
import NotFound from './pages/utility/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected dashboard routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<DashboardPage />} />
        <Route path="dashboard/analytics" element={<Analytics />} />
        <Route path="dashboard/fintech" element={<Fintech />} />

        {/* E-Commerce */}
        <Route path="ecommerce/customers" element={<Customers />} />
        <Route path="ecommerce/orders" element={<Orders />} />
        <Route path="ecommerce/invoices" element={<Invoices />} />
        <Route path="ecommerce/shop" element={<Shop />} />

        {/* Community */}
        <Route path="community/users-tabs" element={<UsersTabs />} />
        <Route path="community/users-tiles" element={<UsersTiles />} />
        <Route path="community/profile" element={<Profile />} />
        <Route path="community/feed" element={<Feed />} />
        <Route path="community/forum" element={<Forum />} />
        <Route path="community/meetups" element={<Meetups />} />

        {/* Finance */}
        <Route path="finance/cards" element={<FinanceCards />} />
        <Route path="finance/transactions" element={<Transactions />} />

        {/* Jobs */}
        <Route path="jobs/listing" element={<JobListing />} />
        <Route path="jobs/company" element={<CompanyProfile />} />

        {/* Tasks */}
        <Route path="tasks/kanban" element={<TasksKanban />} />
        <Route path="tasks/list" element={<TasksList />} />

        {/* Other */}
        <Route path="messages" element={<Messages />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="campaigns" element={<Campaigns />} />

        {/* Settings */}
        <Route path="settings" element={<SettingsLayout />}>
          <Route path="account" element={<Account />} />
          <Route path="notifications" element={<NotificationsSettings />} />
          <Route path="apps" element={<Apps />} />
          <Route path="plans" element={<Plans />} />
          <Route path="billing" element={<Billing />} />
          <Route path="feedback" element={<FeedbackPage />} />
        </Route>

        {/* Utility */}
        <Route path="utility/changelog" element={<Changelog />} />
        <Route path="utility/roadmap" element={<Roadmap />} />
        <Route path="utility/faqs" element={<Faqs />} />
        <Route path="utility/empty-state" element={<EmptyStatePage />} />
        <Route path="utility/knowledge-base" element={<KnowledgeBase />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
